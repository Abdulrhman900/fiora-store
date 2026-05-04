'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AddToCartButton from './AddToCartButton';
import type { Product } from '../lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const categoryLabel = product.featured
    ? 'منتج مميز'
    : product.category === 'clothing'
      ? 'ملابس'
      : product.category === 'accessories'
        ? 'إكسسوارات'
        : product.category === 'fitness'
          ? 'لياقة'
          : product.category === 'bags'
            ? 'حقائب'
            : product.category === 'home'
              ? 'منزل'
              : 'منتج';

  return (
    <motion.article
      className="card product-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-art">
        <span className="product-badge">{categoryLabel}</span>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-image" />
        ) : (
          <div className="product-emoji">{product.image || '✦'}</div>
        )}
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="row">
        <strong className="price">{product.price} ر.س</strong>
        <Link href={`/products/${product.slug}`} className="btn-ghost">
          التفاصيل
        </Link>
      </div>
      <AddToCartButton product={product} className="btn" />
    </motion.article>
  );
}
