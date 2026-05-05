'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import AddToCartButton from '../components/AddToCartButton';
import { featuredProduct, products } from '../lib/data';

export default function HomePage() {
  return (
    <div className="stack">
      <motion.section className="hero-shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="hero-copy">
          <p className="eyebrow">Fiora | Women's Sports Gear</p>
          <h1>البوكس الرياضي ✨</h1>
          <p className="page-copy">
            اكتشفي قوتك مع تشكيلتنا الحصرية. أدوات رياضية وملابس مصممة خصيصاً للمرأة العصرية لتمنحك الأناقة والراحة في كل تمرين.
          </p>
          <div className="hero-badges">
            <span className="pill">279 SAR</span>
            <span className="pill">الأعلى مبيعاً</span>
            <span className="pill">متكامل وعملي</span>
          </div>
          <div className="hero-actions">
            <AddToCartButton product={featuredProduct} className="btn" />
            <Link href="/products" className="btn-secondary">
              استكشاف المنتجات
            </Link>
          </div>
          <div className="feature-list">
            <div className="feature-card">
              <strong>جودة فائقة</strong>
              <span className="muted">خامات قوية ومريحة صُممت لتدوم طويلاً.</span>
            </div>
            <div className="feature-card">
              <strong>أناقة استثنائية</strong>
              <span className="muted">تصاميم عصرية تناسب ذوقك وتبرز جمالك.</span>
            </div>
            <div className="feature-card">
              <strong>رحلة متكاملة</strong>
              <span className="muted">كل ما تحتاجينه في صندوق واحد لبداية مثالية.</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <motion.div className="hero-product" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}>
            <div className="floating-dot dot-1" />
            <div className="floating-dot dot-2" />
            <div className="hero-product-card">
              <div className="hero-chip-row">
                <span className="chip">منتج مميز</span>
                <span className="chip">الأكثر طلباً</span>
              </div>
              <div className="hero-box-visual" style={{ overflow: 'hidden' }}>
                {featuredProduct.imageUrl ? (
                  <img src={featuredProduct.imageUrl} alt={featuredProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="hero-box-fallback">✨</div>
                )}
              </div>
              <div className="stack">
                <strong>{featuredProduct.name}</strong>
                <p>{featuredProduct.description}</p>
                <div className="row">
                  <strong className="price">279 SAR</strong>
                  <span className="pill">توصية البداية</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="stack">
        <div className="section-row">
          <div>
            <p className="eyebrow">البوكسات والمنتجات</p>
            <h2 className="section-heading">اختاري ما يناسب روتينك الرياضي</h2>
          </div>
          <Link href="/bundle" className="btn-secondary">
            عرض البوكس
          </Link>
        </div>
        <div className="catalog-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
