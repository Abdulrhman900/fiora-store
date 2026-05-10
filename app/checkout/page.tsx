'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { saudiCities } from '../../lib/data';
import { supabase } from '../../lib/supabase';
import type { CheckoutForm, OrderInsert } from '../../lib/types';

const initialForm: CheckoutForm = {
  fullName: '',
  phone: '',
  city: 'الرياض',
  address: '',
  paymentMethod: 'cod',
  notes: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const payload: OrderInsert = {
        user_id: userData.user?.id,
        customer_name: form.fullName,
        phone: form.phone,
        city: form.city,
        address: form.address,
        payment_method: form.paymentMethod,
        notes: form.notes,
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
        <p className="page-copy">أدخلي تفاصيل الشحن والدفع، ثم أكدي طلبك ليصل مباشرة إلى قاعدة بيانات Supabase.</p>
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
          <label className="stack">
            <span>طريقة الدفع</span>
            <select className="select" value={form.paymentMethod} onChange={(e) => setForm((current) => ({ ...current, paymentMethod: e.target.value as CheckoutForm['paymentMethod'] }))}>
              <option value="cod">الدفع عند الاستلام</option>
              <option value="card">بطاقة مدى / Visa</option>
            </select>
          </label>
        </div>

        <label className="stack">
          <span>العنوان التفصيلي</span>
          <textarea className="textarea" rows={4} value={form.address} onChange={(e) => setForm((current) => ({ ...current, address: e.target.value }))} required />
        </label>

        <label className="stack">
          <span>ملاحظات الطلب</span>
          <textarea className="textarea" rows={3} value={form.notes} onChange={(e) => setForm((current) => ({ ...current, notes: e.target.value }))} />
        </label>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'جارٍ تأكيد الطلب...' : 'تأكيد الطلب'}
        </button>
        {!isPhoneValid && form.phone ? <p className="muted">رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام.</p> : null}
        {error ? <p className="muted">{error}</p> : null}
      </motion.form>
    </section>
  );
}
