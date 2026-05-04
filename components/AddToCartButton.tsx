'use client';

import { useCart } from '../context/CartContext';
import type { Product } from '../lib/types';

export default function AddToCartButton({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const { addItem } = useCart();

  return (
    <button className="btn" onClick={() => addItem(product, quantity)}>
      إضافة للسلة
    </button>
  );
}
