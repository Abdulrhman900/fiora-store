'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">السلة</p>
        <h1 className="page-title">عربة التسوق</h1>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>السلة فارغة حالياً.</p>
          <Link href="/products" className="btn">
            استكشاف المنتجات
          </Link>
        </div>
      ) : (
        <div className="dashboard-panel">
          {items.map((item) => (
            <motion.article className="dashboard-row" key={`${item.id}-${item.variantLabel || 'default'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div>
                <strong>{item.name}</strong>
                <div className="small">{item.variantLabel || 'النسخة الأساسية'}</div>
              </div>
              <div className="row" style={{ justifyContent: 'center' }}>
                <button type="button" className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1, item.variantLabel)}>
                  -
                </button>
                <strong>{item.quantity}</strong>
                <button type="button" className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantLabel)}>
                  +
                </button>
              </div>
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <strong>{item.price * item.quantity} ر.س</strong>
                <button type="button" className="btn-secondary" onClick={() => removeItem(item.id, item.variantLabel)}>
                  حذف
                </button>
              </div>
            </motion.article>
          ))}

          <div className="checkout-summary">
            <div className="total-row">
              <strong>الإجمالي</strong>
              <strong>{totalPrice} ر.س</strong>
            </div>
            <div className="drawer-actions">
              <button type="button" className="btn-secondary" onClick={clearCart}>
                تفريغ السلة
              </button>
              <Link href="/checkout" className="btn">
                إتمام الطلب
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
