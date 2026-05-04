'use client';

import { FormEvent, useEffect, useState } from 'react';
import { products as staticProducts } from '../../../lib/data';
import { supabase } from '../../../lib/supabase';
import type { Product } from '../../../lib/types';

const emptyProduct: Product = {
  id: '',
  name: '',
  description: '',
  price: 0,
  image: '🛍️',
  category: 'supplements',
};

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('products').select('*').order('id');
      if (data && data.length > 0) {
        setItems(data as Product[]);
      } else {
        setItems(staticProducts);
      }
    };
    void load();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      const updated = { ...form, id: editingId };
      setItems((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      await supabase.from('products').update(updated).eq('id', editingId);
      setEditingId(null);
      setForm(emptyProduct);
      return;
    }

    const id = String(Date.now());
    const newItem = { ...form, id };
    setItems((prev) => [newItem, ...prev]);
    await supabase.from('products').insert(newItem);
    setForm(emptyProduct);
  };

  const onDelete = async (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    await supabase.from('products').delete().eq('id', id);
  };

  return (
    <section className="stack">
      <h1>إدارة المنتجات</h1>
      <form className="card stack" onSubmit={onSubmit}>
        <div className="form-grid">
          <label>
            اسم المنتج
            <input className="input" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          </label>
          <label>
            السعر
            <input className="input" type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))} required />
          </label>
        </div>
        <label>
          الوصف
          <textarea className="textarea" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
        </label>
        <button className="btn" type="submit">{editingId ? 'تحديث المنتج' : 'إضافة منتج'}</button>
      </form>

      {items.map((item) => (
        <article className="card" key={item.id}>
          <div className="row">
            <strong>{item.name}</strong>
            <span className="price">{item.price} ر.س</span>
          </div>
          <p>{item.description}</p>
          <div className="row">
            <button className="btn secondary" onClick={() => { setEditingId(item.id); setForm(item); }}>تعديل</button>
            <button className="btn" onClick={() => void onDelete(item.id)}>حذف</button>
          </div>
        </article>
      ))}
    </section>
  );
}
