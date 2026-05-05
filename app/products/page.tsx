import { createSupabaseServerClient } from '../../lib/supabase-server';
import ProductsClient from './ProductsClient';
import { products as staticProducts } from '../../lib/data';

export const revalidate = 0;

export default async function ProductsRoute() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  const products = data || staticProducts;

  return <ProductsClient products={products} />;
}