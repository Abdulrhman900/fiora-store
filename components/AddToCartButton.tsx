'use client';

import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import type { Product } from '../lib/types';

export default function AddToCartButton({
  product,
  quantity = 1,
  variantLabel = '',
  className = 'btn',
}: {
  product: Product;
  quantity?: number;
  variantLabel?: string;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      onClick={() => addItem(product, quantity, variantLabel)}
    >
      أضف للسلة
    </motion.button>
  );
}
