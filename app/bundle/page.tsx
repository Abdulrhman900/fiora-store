'use client';

import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';
import { bundleProductIds, products } from '../../lib/data';

export default function BundlePage() {
  const { addItem } = useCart();
  const bundleItems = products.filter((product) => bundleProductIds.includes(product.id));
  const total = bundleItems.reduce((sum, product) => sum + product.price, 0);
  const discounted = Math.round(total * 0.9);

  return (
    <section className="stack">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">بوكس فيورا</p>
          <h1 className="page-title">البوكس الرياضي المخصص للبداية السريعة</h1>
          <p className="page-copy">احصلي على بوكس متناسق يجمع بين منتج البداية الرياضية مع أفضل الأدوات المساعدة.</p>
          <div className="hero-badges">
            <span className="pill">سعر خاص</span>
            <span className="pill">تجربة متكاملة</span>
          </div>
          <div className="hero-actions">
            <button
              type="button"
              className="btn"
              onClick={() => {
                bundleItems.forEach((product) => addItem(product));
              }}
            >
              أضف البوكس للسلة
            </button>
          </div>
        </div>

        <motion.div className="hero-visual" animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="hero-product">
            <div className="hero-product-card">
              <div className="hero-chip-row">
                <span className="chip">خصم البوكس</span>
                <span className="chip">{discounted} ر.س بدل {total} ر.س</span>
              </div>
              <div className="hero-box-visual">
                <div className="hero-box-fallback">🎀</div>
              </div>
              <strong>البوكس الرياضي المخصص</strong>
              <span className="price">{discounted} ر.س</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="catalog-grid">
        {bundleItems.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
