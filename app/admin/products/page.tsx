'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import type { Product } from '../../../lib/types';

const initialProduct: Product = {
  id: '',
  slug: '',
  name: '',
  description: '',
  price: 0,
  category: 'accessories',
  imageUrl: '',
  featured: false,
  variants: [],
};

type ProductFormState = Product & { variantsText: string };

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0600-\u06FF-]/g, '')
    .replace(/-+/g, '-');
}

function serializeVariants(product: Product) {
  return (product.variants || [])
    .map((variant) => `${variant.name}: ${variant.options.join(', ')}`)
    .join('\n');
}

function parseVariants(text: string) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, values] = line.split(':');
      return {
        name: (name || '').trim(),
        options: (values || '')
          .split(',')
          .map((option) => option.trim())
          .filter(Boolean),
      };
    })
    .filter((variant) => variant.name && variant.options.length);
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProductFormState>({ ...initialProduct, variantsText: '' });

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
      }
    };

    void load();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setPreview('');
    setForm({ ...initialProduct, variantsText: '' });
  };

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    
    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(String(reader.result || ''));
    };
    reader.readAsDataURL(file);

    try {
      setLoading(true);
      const { supabase } = await import('../../../lib/supabase');
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setForm((current) => ({ ...current, imageUrl: data.publicUrl }));
    } catch (err) {
      alert('خطأ في رفع الصورة: ' + (err instanceof Error ? err.message : 'يرجى التأكد من إعدادات Storage'));
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || toSlug(form.name),
        variants: parseVariants(form.variantsText),
      };
      const response = await fetch(editingId ? `/api/admin/products/${editingId}` : '/api/admin/products', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'تعذر حفظ المنتج');
      const saved: Product = data.product;
      setProducts((current) =>
        editingId ? current.map((item) => (item.id === saved.id ? saved : item)) : [saved, ...current]
      );
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'تعذر حفظ المنتج');
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);
    setPreview(product.imageUrl || '');
    setForm({
      ...product,
      variantsText: serializeVariants(product),
    });
  };

  const removeProduct = async (id: string) => {
    const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setProducts((current) => current.filter((item) => item.id !== id));
      if (editingId === id) resetForm();
    }
  };

  const variantsPreview = useMemo(() => parseVariants(form.variantsText), [form.variantsText]);

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">إدارة المنتجات</p>
        <h1 className="page-title">CRUD المنتجات</h1>
        <p className="page-copy">إضافة، تعديل، حذف، رفع صورة، وتحديد المقاسات/الألوان.</p>
      </div>

      <motion.form className="dashboard-panel product-form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="form-grid">
          <label className="stack">
            <span>اسم المنتج</span>
            <input className="input" value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} required />
          </label>
          <label className="stack">
            <span>الSlug</span>
            <input className="input" value={form.slug} onChange={(e) => setForm((current) => ({ ...current, slug: e.target.value }))} placeholder="يُولد تلقائياً إذا كان فارغاً" />
          </label>
        </div>

        <div className="form-grid">
          <label className="stack">
            <span>السعر</span>
            <input className="input" type="number" min={0} value={form.price} onChange={(e) => setForm((current) => ({ ...current, price: Number(e.target.value) }))} required />
          </label>
          <label className="stack">
            <span>التصنيف</span>
            <select className="select" value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}>
              <option value="featured">مميز</option>
              <option value="clothing">ملابس</option>
              <option value="accessories">إكسسوارات</option>
              <option value="fitness">لياقة</option>
              <option value="bags">حقائب</option>
              <option value="home">منزل</option>
            </select>
          </label>
        </div>

        <label className="stack">
          <span>الوصف</span>
          <textarea className="textarea" rows={4} value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} required />
        </label>

        <div className="form-grid">
          <label className="stack">
            <span>صورة المنتج</span>
            <input className="input" type="file" accept="image/*" onChange={(e) => void handleFile(e.target.files?.[0])} />
          </label>
          <label className="stack">
            <span>أو رابط الصورة</span>
            <input className="input" value={form.imageUrl} onChange={(e) => setForm((current) => ({ ...current, imageUrl: e.target.value }))} placeholder="https://..." />
          </label>
        </div>

        <div className="form-grid">
          <label className="stack">
            <span>مواصفات المقاسات/الألوان</span>
            <textarea
              className="textarea"
              rows={4}
              value={form.variantsText}
              onChange={(e) => setForm((current) => ({ ...current, variantsText: e.target.value }))}
              placeholder="المقاس: S, M, L, XL"
            />
          </label>
          <div className="stack">
            <span>معاينة</span>
            <div className="checkout-summary">
              <div className="hero-box-visual" style={{ minHeight: '160px' }}>
                {preview ? <img src={preview} alt="معاينة المنتج" /> : <div className="hero-box-fallback">🛍️</div>}
              </div>
              <div className="hero-badges">
                {variantsPreview.map((variant) => (
                  <span className="pill" key={variant.name}>
                    {variant.name}: {variant.options.join('، ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <label className="row" style={{ justifyContent: 'flex-start' }}>
          <input type="checkbox" checked={form.featured || false} onChange={(e) => setForm((current) => ({ ...current, featured: e.target.checked }))} />
          <span>تعريفه كمنتج مميز</span>
        </label>

        <div className="row">
          <button className="btn" type="submit" disabled={loading}>
            <Plus size={16} /> {editingId ? 'تحديث المنتج' : 'إضافة المنتج'}
          </button>
          {editingId ? (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              إلغاء
            </button>
          ) : null}
        </div>
      </motion.form>

      <div className="dashboard-list">
        {products.map((product) => (
          <article className="dashboard-row" key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <div className="small">{product.description}</div>
            </div>
            <strong>{product.price} ر.س</strong>
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary" onClick={() => editProduct(product)}>
                تعديل
              </button>
              <button type="button" className="btn" onClick={() => void removeProduct(product.id)}>
                <Trash2 size={16} /> حذف
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
