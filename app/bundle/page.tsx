'use client';

import { useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { bundleProductIds, products } from '../../lib/data';

export default function BundlePage() {
  const { addItem } = useCart();
  const bundleItems = products.filter((p) => bundleProductIds.includes(p.id));
  const total = useMemo(() => bundleItems.reduce((sum, p) => sum + p.price, 0), [bundleItems]);
  const discountedTotal = Math.round(total * 0.85);

  return (
    <section className="stack">
      <h1>باقة فيورا الأساسية</h1>
      <p>خصم 15% عند شراء الباقة كاملة.</p>

      <div className="grid">
        {bundleItems.map((item) => (
          <article key={item.id} className="card">
            <div className="card-emoji">{item.image}</div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="price">{item.price} ر.س</span>
          </article>
        ))}
      </div>

      <article className="card">
        <div className="row">
          <span>سعر المنتجات منفصلة: {total} ر.س</span>
          <span className="price">سعر الباقة: {discountedTotal} ر.س</span>
        </div>
        <button
          className="btn"
          onClick={() => {
            bundleItems.forEach((item) => addItem(item, 1));
          }}
        >
          إضافة الباقة كاملة للسلة
        </button>
      </article>
    </section>
  );
}
