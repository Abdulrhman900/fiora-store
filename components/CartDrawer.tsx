'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="إغلاق السلة"
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-label="سلة التسوق"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">عربة التسوق</p>
                <h3>سلتك الآن</h3>
              </div>
              <button type="button" className="icon-btn" onClick={closeCart} aria-label="إغلاق">
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              {items.length === 0 ? (
                <div className="empty-state">
                  <ShoppingBag size={40} />
                  <p>لا توجد منتجات بعد. أضيفي أول قطعة لاستكشاف السلة.</p>
                </div>
              ) : (
                items.map((item) => (
                  <article className="drawer-item" key={`${item.id}-${item.variantLabel || 'default'}`}>
                    <div className="drawer-thumb">
                      <span>{item.image || 'F'}</span>
                    </div>
                    <div className="drawer-item-main">
                      <h4>{item.name}</h4>
                      {item.variantLabel ? <p>{item.variantLabel}</p> : <p>النسخة الأساسية</p>}
                      <strong>{item.price} ر.س</strong>
                    </div>
                    <div className="drawer-item-actions">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variantLabel)}
                        aria-label="تقليل الكمية"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantLabel)}
                        aria-label="زيادة الكمية"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        className="text-btn"
                        onClick={() => removeItem(item.id, item.variantLabel)}
                      >
                        حذف
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="drawer-footer">
              <div className="total-row">
                <span>الإجمالي</span>
                <strong>{totalPrice} ر.س</strong>
              </div>
              <div className="drawer-actions">
                <Link href="/cart" className="btn btn-ghost" onClick={closeCart}>
                  عرض السلة
                </Link>
                <Link href="/checkout" className="btn" onClick={closeCart}>
                  إتمام الطلب
                </Link>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
