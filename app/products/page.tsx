'use client';

import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { products } from '../../lib/data';

const blockedNames = new Set(['مجموعة دمبل خفيفة', 'حقيبة عملية', 'حقيبة رياضية']);
const blockedSlugs = new Set(['light-dumbbells', 'practical-bag', 'sports-bag']);

export default function ProductsPage() {
  const visibleProducts = products.filter((product) => !blockedNames.has(product.name) && !blockedSlugs.has(product.slug));

  return (
    <section className="stack">
      <motion.div className="section-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div>
          <p className="eyebrow">المنتجات</p>
          <h1 className="page-title">كل المنتجات في FLORA</h1>
          <p className="page-copy">{visibleProducts.length} منتجاً منتقى بعناية لتجربة تسوق نسائية أنيقة وسريعة.</p>
        </div>
        <span className="pill">مكتبة مرتبة</span>
      </motion.div>

      <div className="catalog-grid">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
