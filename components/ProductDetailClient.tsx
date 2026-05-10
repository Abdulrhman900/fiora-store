'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AddToCartButton from './AddToCartButton';
import type { Product } from '../lib/types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((variant) => {
      initial[variant.name] = variant.options[0];
    });
    return initial;
  });

  const variantLabel = useMemo(
    () =>
      Object.entries(selections)
        .map(([name, value]) => `${name}: ${value}`)
        .join(' | '),
    [selections]
  );

  return (
    <motion.div className="hero-shell" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <div className="hero-copy">
        <p className="eyebrow">تفاصيل المنتج</p>
        <h1>{product.name}</h1>
        <p className="page-copy">{product.description}</p>
        <div className="hero-badges">
          <span className="pill">{product.price} ر.س</span>
          {product.featured ? <span className="pill">منتج مميز</span> : null}
          {product.variants?.map((variant) => (
            <span key={variant.name} className="pill">
              {variant.name}
            </span>
          ))}
        </div>

        {product.variants?.length ? (
          <div className="stack">
            {product.variants.map((variant) => (
              <label key={variant.name} className="stack">
                <span>{variant.name}</span>
                <select
                  className="select"
                  value={selections[variant.name]}
                  onChange={(e) => setSelections((prev) => ({ ...prev, [variant.name]: e.target.value }))}
                >
                  {variant.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        ) : null}

        <AddToCartButton product={product} variantLabel={variantLabel} className="btn" />
      </div>
      <div className="hero-visual">
        <motion.div className="hero-product" animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="hero-product-card">
            <div className="hero-chip-row">
              <span className="chip">تصميم نسائي</span>
              <span className="chip">شحن سريع</span>
            </div>
            <div className="hero-box-visual" style={{ background: `linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02)), linear-gradient(135deg, var(--primary), var(--secondary))` }}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="hero-box-fallback">{product.image || 'F'}</div>
              )}
            </div>
            <div className="stack">
              <strong>{product.name}</strong>
              <p>{variantLabel || 'اختاري المقاس أو اللون المناسب قبل الإضافة.'}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
