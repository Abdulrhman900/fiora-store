'use client';

import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import type { Product } from '../../lib/types';

interface Props {
  products: Product[];
}

export default function ProductsPage({ products }: Props) {
  return (
    <section className="stack">
      <motion.div className="section-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div>
          <p className="eyebrow">المنتجات</p>
          <h1 className="page-title">كل المنتجات في فيورا</h1>
          <p className="page-copy">{products.length} منتجاً منتقى بعناية لتجربة تسوق نسائية أنيقة وسريعة.</p>
        </div>
        <span className="pill">مكتبة مرتبة</span>
      </motion.div>

      <div className="catalog-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
