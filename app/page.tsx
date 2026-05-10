'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import AddToCartButton from '../components/AddToCartButton';
import { products as staticProducts } from '../lib/data';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/types';

export default function HomePage() {
  const [featuredProduct, setFeaturedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('slug', 'sports-starter-box')
          .single();

        if (data) {
          setFeaturedProduct(data);
        }
      } catch (err) {
        console.warn('Could not fetch dynamic featured product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const heroItem = featuredProduct || staticProducts.find(p => p.slug === 'sports-starter-box') || staticProducts[0];

  return (
    <div className="stack">
      <motion.section className="hero-shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="hero-copy">
          <h1>البوكس الرياضي ✨</h1>
          <p className="page-copy" style={{ whiteSpace: 'pre-line' }}>
            {heroItem.description}
          </p>
          <div className="hero-badges">
            <span className="pill">الأعلى مبيعاً</span>
            <span className="pill">متكامل وعملي</span>
          </div>
          <div className="hero-actions">
            <AddToCartButton product={heroItem} className="btn" />
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
          </div>
        </div>

        <div className="hero-visual">
          <motion.div className="hero-product" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'none', border: 'none', boxShadow: 'none' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <img src="/images/BOX_SPORT.jpg" alt="البوكس الرياضي 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginTop: '2rem' }}>
              <img src="/images/BOX_SPORT2.jpg" alt="البوكس الرياضي 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          {staticProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
