'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { saudiCities } from '../../lib/data';
import { supabase } from '../../lib/supabase';
import type { CheckoutForm, OrderInsert } from '../../lib/types';

const initialForm = {
  fullName: '',
  phone: '',
  city: 'الرياض',
  address: '',
  paymentMethod: 'mada',
  notes: '',
  mapPinned: false,
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);

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
      setProcessingPayment(true);
      
      // Attempt Supabase insert but don't fail if it bombs (simulate success)
      try {
        const { data: userData } = await supabase.auth.getUser();
        const payload: OrderInsert = {
          user_id: userData?.user?.id,
          customer_name: form.fullName,
          phone: form.phone,
          city: form.city,
          address: form.address,
          payment_method: form.paymentMethod === 'cod' ? 'cod' : 'card',
          notes: form.notes,
          items,
          total_price: totalPrice,
          status: 'pending',
        };
        await supabase.from('orders').insert(payload);
      } catch (insertError) {
        console.warn('Supabase DB insert ignored in simulation mode.', insertError)
      }

      setTimeout(() => {
        clearCart();
        setProcessingPayment(false);
        router.push('/checkout/success');
      }, 4000); // 4 seconds delay for simulation

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'فشل إنشاء الطلب.';
      setError(msg);
      setLoading(false);
      setProcessingPayment(false);
    }
  };

  const handleMapPin = () => {
    setForm(f => ({ ...f, mapPinned: true }));
    alert('تم تحديد الموقع بنجاح!');
  };

  return (
    <>
      <AnimatePresence>
        {processingPayment && (
          <motion.div 
            className="payment-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}
          >
            <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            <h2 style={{ marginTop: '20px' }}>جاري معالجة الدفعة...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero-shell auth-shell">
        <div className="hero-copy">
          <p className="eyebrow">الدفع</p>
          <h1 className="page-title">إتمام الطلب</h1>
          <p className="page-copy">أدخلي تفاصيل الشحن، حددي موقعك على الخريطة، واختاري طريقة الدفع المفضلة لديك.</p>
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

        <motion.form className="dashboard-panel product-form" onSubmit={submit} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
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

          <label className="stack">
            <span>العنوان التفصيلي</span>
            <textarea className="textarea" rows={2} value={form.address} onChange={(e) => setForm((current) => ({ ...current, address: e.target.value }))} required />
          </label>

          <div className="stack" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <span>موقع التوصيل (الخريطة)</span>
            <div style={{ height: '150px', background: '#e9ecef', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: form.mapPinned ? '2px solid #10b981' : '1px dashed #ccc' }}>
              {form.mapPinned ? (
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>📍 تم اختيار الموقع بنجاح</span>
              ) : (
                <button type="button" onClick={handleMapPin} style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>اضغطي لتحديد الموقع</button>
              )}
            </div>
          </div>

          <div className="stack" style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 600 }}>طريقة الدفع</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { id: 'mada', label: 'مدى', bg: '#f9f9f9' },
                { id: 'mastercard', label: 'ماستركارد / فيزا', bg: '#f9f9f9' },
                { id: 'tamara', label: 'تمارا', bg: '#f9f9f9' },
                { id: 'cod', label: 'الدفع عند الاستلام', bg: '#f9f9f9' }
              ].map(method => (
                <div key={method.id} onClick={() => setForm(f => ({ ...f, paymentMethod: method.id }))} style={{ border: form.paymentMethod === method.id ? '2px solid #d946ef' : '1px solid #ddd', padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: method.bg, transition: 'all 0.2s' }}>
                  <img src={`/${method.id}.png`} alt={method.label} style={{ height: '24px', margin: '0 auto 8px', display: 'block', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: form.paymentMethod === method.id ? 'bold' : 'normal' }}>{method.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn" type="submit" disabled={loading || processingPayment}>
            {loading ? 'جارٍ معالجة الطلب...' : 'دفع و إتمام الطلب'}
          </button>
          {!isPhoneValid && form.phone && <p className="muted">رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.</p>}
          {error && <p className="muted" style={{ color: '#ef4444' }}>{error}</p>}
        </motion.form>
      </section>
    </>
  );
}
