'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="stack">
        <h1>سلة التسوق</h1>
        <p>السلة فارغة حالياً.</p>
        <Link href="/products" className="btn">اذهب للمنتجات</Link>
      </section>
    );
  }

  return (
    <section className="stack">
      <h1>سلة التسوق</h1>
      {items.map((item) => (
        <article className="card" key={item.id}>
          <div className="row">
            <strong>{item.name}</strong>
            <span className="price">{item.price} ر.س</span>
          </div>
          <div className="row">
            <label>
              الكمية
              <input
                className="input"
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              />
            </label>
            <button className="btn secondary" onClick={() => removeItem(item.id)}>حذف</button>
          </div>
        </article>
      ))}
      <article className="card row">
        <strong>الإجمالي: {totalPrice} ر.س</strong>
        <div className="row">
          <button className="btn secondary" onClick={clearCart}>تفريغ السلة</button>
          <Link href="/checkout" className="btn">إتمام الطلب</Link>
        </div>
      </article>
    </section>
  );
}
