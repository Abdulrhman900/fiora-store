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
          <h1>بوكس البداية الرياضية ✨</h1>
          <p className="page-copy">
            كل احتياجاتك الرياضية في بوكس واحد أنيق ومتكامل، يجمع بين الراحة والعملية ليكون خيارك المثالي لبدء أو تطوير روتينك الرياضي بكل سهولة.
          </p>
          <div className="hero-badges">
            <span className="pill">279 SAR</span>
            <span className="pill">تجربة فخمة</span>
            <span className="pill">RTL عربي</span>
          </div>
          <div className="hero-actions">
            <AddToCartButton product={featuredProduct} className="btn" />
            <Link href="/products" className="btn-secondary">
              استكشاف المنتجات
            </Link>
          </div>
          <div className="feature-list">
            <div className="feature-card">
              <strong>تجربة سلة عصرية</strong>
              <span className="muted">Slide-over cart مع إضافة فورية.</span>
            </div>
            <div className="feature-card">
              <strong>منتجات مختارة</strong>
              <span className="muted">11 منتجاً مطابقاً لقائمة السِيد.</span>
            </div>
            <div className="feature-card">
              <strong>دفع وإدارة</strong>
              <span className="muted">Supabase + لوحة تحكم إدارية واقعية.</span>
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
              <div className="hero-box-visual">
                <div className="hero-box-fallback">✨</div>
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
