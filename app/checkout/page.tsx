'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { saudiCities } from '../../lib/data';
import { supabase } from '../../lib/supabase';
import type { CheckoutForm, OrderInsert } from '../../lib/types';

type CheckoutState = CheckoutForm & {
  mapPinned: boolean;
};

const initialForm: CheckoutState = {
  fullName: '',
  phone: '',
  city: 'الرياض',
  paymentMethod: 'mada',
  notes: '',
  mapPinned: false,
};

const paymentMethods = [
  { id: 'mada', label: 'مدى' },
  { id: 'visa', label: 'فيزا' },
  { id: 'tabby', label: 'تابي' },
  { id: 'tamara', label: 'تمارا' },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliveryLocation] = useState('الرياض (24.7136, 46.6753)');

  const isPhoneValid = useMemo(() => /^05\d{8}$/.test(form.phone), [form.phone]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (items.length === 0) {
      setError('السلة فارغة. أضيفي منتجات أولاً.');
      return;
    }

    if (!isPhoneValid) {
      setError('رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.');
      return;
    }

    if (!form.mapPinned) {
      setError('يرجى تحديد موقع التوصيل على الخريطة أولاً.');
      return;
    }

    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const payload: OrderInsert = {
        user_id: userData?.user?.id,
        customer_name: form.fullName,
        phone: form.phone,
        city: form.city,
        address: `Map Pin: ${deliveryLocation}`,
        payment_method: form.paymentMethod,
        notes: `طريقة الدفع المختارة: ${form.paymentMethod} | ${form.notes}`,
        items,
        total_price: totalPrice,
        status: 'pending',
      };

      const { error: insertError } = await supabase.from('orders').insert(payload);
      if (insertError) throw insertError;

      clearCart();
      router.push('/checkout/success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'فشل إنشاء الطلب.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero-shell auth-shell">
      <div className="hero-copy">
        <p className="eyebrow">الدفع</p>
        <h1 className="page-title">إتمام الطلب</h1>
        <p className="page-copy">أدخلي بياناتك واختاري MAP وهمي مع طريقة الدفع المناسبة.</p>
        <div className="checkout-summary">
          {items.map((item) => (
            <div key={`${item.id}-${item.variantLabel || 'default'}`} className="row">
              <span>{item.name}</span>
              <strong>{item.price * item.quantity} ر.س</strong>
            </div>
          ))}
          <div className="total-row">
            <strong>المجموع</strong>
            <strong>{totalPrice} ر.س</strong>
          </div>
        </div>
      </div>

      <form className="dashboard-panel product-form" onSubmit={submit}>
        <div className="form-grid">
          <label className="stack">
            <span>الاسم الكامل</span>
            <input className="input" value={form.fullName} onChange={(e) => setForm((current) => ({ ...current, fullName: e.target.value }))} required />
          </label>
          <label className="stack">
            <span>رقم الجوال</span>
            <input className="input" value={form.phone} onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value }))} placeholder="05xxxxxxxx" required />
          </label>
        </div>

        <div className="form-grid">
          <label className="stack">
            <span>المدينة</span>
            <select className="select" value={form.city} onChange={(e) => setForm((current) => ({ ...current, city: e.target.value }))}>
              {saudiCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="stack" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <span>موقع التوصيل (MAP وهمي)</span>
          <div style={{ height: '240px', position: 'relative', background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '8px', overflow: 'hidden', border: form.mapPinned ? '2px solid #10b981' : '1px solid #ccc' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.7 }} />
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
              <span style={{ fontSize: '2rem' }}>📍</span>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem', marginTop: '0.75rem' }}>
            <input className="input" readOnly value={`📍 موقع التوصيل المحدد: ${deliveryLocation}`} />
            <button type="button" className="btn-secondary" onClick={() => setForm((current) => ({ ...current, mapPinned: true }))}>
              تأكيد الموقع
            </button>
          </div>
        </div>

        <div className="stack" style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontWeight: 600 }}>طريقة الدفع</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setForm((current) => ({ ...current, paymentMethod: method.id }))}
                style={{ border: form.paymentMethod === method.id ? '2px solid #d946ef' : '1px solid #ddd', padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: '#f9f9f9', transition: 'all 0.2s' }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: form.paymentMethod === method.id ? 'bold' : 'normal' }}>{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'جارٍ معالجة الطلب...' : 'دفع و إتمام الطلب'}
        </button>
        {!isPhoneValid && form.phone && <p className="muted">رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.</p>}
        {error && <p className="muted" style={{ color: '#ef4444' }}>{error}</p>}
      </form>
    </section>
  );
}
