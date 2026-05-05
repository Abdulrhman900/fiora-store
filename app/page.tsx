import { createSupabaseServerClient } from '../lib/supabase-server';
import HomePageClient from './HomePageClient';
import { products as staticProducts } from '../lib/data';

export const revalidate = 0;

export default async function HomePageRoute() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  const products = data || staticProducts;
  const featuredProduct = products.find((p: any) => p.featured || p.slug === 'sports-starter-box') || products[0];

  return <HomePageClient products={products} featuredProduct={featuredProduct} />;
}