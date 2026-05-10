import { notFound } from 'next/navigation';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { products } from '../../../lib/data';
import type { Product } from '../../../lib/types';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products.find((entry: Product) => entry.id === params.id || entry.slug === params.id);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
