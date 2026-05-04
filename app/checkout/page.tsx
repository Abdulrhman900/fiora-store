'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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
      setError('السلة فارغة. أضف منتجات أولاً.');
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
    <section className="stack">
      <h1>الدفع</h1>
      <form className="card stack" onSubmit={submit}>
        <div className="form-grid">
          <label>
            الاسم الكامل
            <input
              className="input"
              value={form.fullName}
              onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              required
            />
          </label>
          <label>
            رقم الجوال
            <input
              className="input"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="05xxxxxxxx"
              required
            />
          </label>
        </div>

        <div className="form-grid">
          <label>
            المدينة
            <select
              className="select"
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            >
              {saudiCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
          <label>
            طريقة الدفع
            <select
              className="select"
              value={form.paymentMethod}
              onChange={(e) =>
                setForm((p) => ({ ...p, paymentMethod: e.target.value as CheckoutForm['paymentMethod'] }))
              }
            >
              <option value="cod">الدفع عند الاستلام</option>
              <option value="card">بطاقة مدى / فيزا</option>
            </select>
          </label>
        </div>

        <label>
          العنوان التفصيلي
          <textarea
            className="textarea"
            rows={3}
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            required
          />
        </label>

        <label>
          ملاحظات الطلب
          <textarea
            className="textarea"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          />
        </label>

        <div className="row">
          <strong>الإجمالي: {totalPrice} ر.س</strong>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'جارٍ تنفيذ الطلب...' : 'تأكيد الطلب'}
          </button>
        </div>
        {!isPhoneValid && form.phone && <p>تحقق من رقم الجوال: يجب أن يبدأ بـ 05 ويكون 10 أرقام.</p>}
        {error && <p>{error}</p>}
      </form>
    </section>
  );
}
