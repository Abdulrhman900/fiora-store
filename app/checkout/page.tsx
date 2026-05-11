'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { saudiCities } from '../../lib/data';
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
  { id: 'mada', label: 'مدى', bg: '#f9f9f9' },
  { id: 'visa', label: 'فيزا', bg: '#f9f9f9' },
  { id: 'tabby', label: 'تابي', bg: '#f9f9f9' },
  { id: 'tamara', label: 'تمارا', bg: '#f9f9f9' },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [processingMessage, setProcessingMessage] = useState('');
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
      setProcessingState('processing');
      setProcessingMessage('جاري إرسال الطلب...');

      const payload: OrderInsert = {
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

      await new Promise((resolve) => setTimeout(resolve, 1300));
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'فشل إنشاء الطلب.');
      }

      clearCart();
      setProcessingState('success');
      setProcessingMessage('تم إنشاء الطلب بنجاح.');
      setTimeout(() => {
        router.push('/checkout/success');
      }, 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'فشل إنشاء الطلب.';
      setError(msg);
      setProcessingState('error');
      setProcessingMessage(msg);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  const handleMapPin = () => {
    setForm((current) => ({ ...current, mapPinned: true }));
  };

  return (
    <>
      <AnimatePresence>
        {processingState !== 'idle' && (
          <motion.div
            className="payment-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'radial-gradient(circle at 20% 20%, rgba(244, 114, 182, 0.32), rgba(0, 0, 0, 0.75))',
              backdropFilter: 'blur(10px)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
            }}
          >
            {processingState === 'processing' ? (
              <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <div style={{ fontSize: '48px' }}>{processingState === 'success' ? '✅' : '❌'}</div>
            )}
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            <h2 style={{ marginTop: '20px' }}>{processingState === 'processing' ? 'جاري معالجة الطلب...' : processingMessage}</h2>
            <p style={{ marginTop: '8px', color: 'rgba(255,255,255,0.9)' }}>{processingState === 'processing' ? 'لا تغلق الصفحة' : 'يمكنك المتابعة الآن'}</p>
            {processingState === 'error' ? (
              <button type="button" className="btn-secondary" style={{ marginTop: '16px' }} onClick={() => setProcessingState('idle')}>
                إغلاق
              </button>
            ) : null}
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

          <div className="stack" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <span>موقع التوصيل</span>
            <div style={{ height: '280px', position: 'relative', background: 'linear-gradient(160deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '8px', overflow: 'hidden', border: form.mapPinned ? '2px solid #10b981' : '1px solid #ccc' }}>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  opacity: 0.7,
                }}
              />
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
                <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))' }}>📍</span>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '0.6rem', marginTop: '0.75rem' }}>
              <input className="input" readOnly value={`📍 موقع التوصيل المحدد: ${deliveryLocation}`} />
              <button type="button" className="btn-secondary" onClick={handleMapPin}>
                تأكيد الموقع
              </button>
              {form.mapPinned && <span style={{ color: '#10b981', fontWeight: 600 }}>تم تأكيد الموقع بنجاح.</span>}
            </div>
          </div>

          <div className="stack" style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 600 }}>طريقة الدفع</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {paymentMethods.map((method) => (
                <div key={method.id} onClick={() => setForm((f) => ({ ...f, paymentMethod: method.id }))} style={{ border: form.paymentMethod === method.id ? '2px solid #d946ef' : '1px solid #ddd', padding: '10px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', background: method.bg, transition: 'all 0.2s' }}>
                  <img src={`/${method.id}.png`} alt={method.label} style={{ height: '24px', margin: '0 auto 8px', display: 'block', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: form.paymentMethod === method.id ? 'bold' : 'normal' }}>{method.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="btn" type="submit" disabled={loading || processingState === 'processing'}>
            {loading ? 'جارٍ معالجة الطلب...' : 'دفع و إتمام الطلب'}
          </button>
          {!isPhoneValid && form.phone && <p className="muted">رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.</p>}
          {error && <p className="muted" style={{ color: '#ef4444' }}>{error}</p>}
        </motion.form>
      </section>
    </>
  );
}
