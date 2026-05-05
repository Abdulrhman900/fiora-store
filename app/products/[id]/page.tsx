import { notFound } from 'next/navigation';
import ProductDetailClient from '../../../components/ProductDetailClient';
import { createSupabaseServerClient } from '../../../lib/supabase-server';
import type { Product } from '../../../lib/types';

export const revalidate = 0;

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();
  
  if (!product) {
    const { data: slugProduct } = await supabase.from('products').select('*').eq('slug', params.id).single();
    if (!slugProduct) notFound();
    return <ProductDetailClient product={slugProduct} />;
  }

  return <ProductDetailClient product={product} />;
}
