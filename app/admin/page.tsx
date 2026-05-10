import { createSupabaseAdminClient } from '../../lib/supabase-admin';
import { products as seedProducts } from '../../lib/data';
import type { AdminStats } from '../../lib/types';

async function getStats(): Promise<AdminStats> {
  const supabase = createSupabaseAdminClient();
  const [{ data: productRows }, { data: orderRows }] = await Promise.all([
    supabase.from('products').select('id'),
    supabase.from('orders').select('total_price'),
  ]);

  const totalProducts = productRows?.length || seedProducts.length;
  const totalOrders = orderRows?.length || 0;
  const totalSales = orderRows?.reduce((sum, order) => sum + Number(order.total_price || 0), 0) || 0;

  return { totalSales, totalOrders, totalProducts };
}

export default async function AdminHomePage() {
  const stats = await getStats();

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">نظرة عامة</p>
        <h1 className="page-title">لوحة إدارة FLORA</h1>
        <p className="page-copy">إدارة مباشرة للمنتجات والطلبات مع مؤشرات تشغيلية سريعة.</p>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <span className="muted">إجمالي المبيعات</span>
          <strong>{stats.totalSales} ر.س</strong>
        </article>
        <article className="stat-card">
          <span className="muted">عدد الطلبات</span>
          <strong>{stats.totalOrders}</strong>
        </article>
        <article className="stat-card">
          <span className="muted">عدد المنتجات</span>
          <strong>{stats.totalProducts}</strong>
        </article>
      </div>

      <div className="dashboard-panel">
        <div className="section-row">
          <div>
            <h2>أدوات سريعة</h2>
            <p className="muted">أضيفي منتجات، راقبي الطلبات، وحدّثي الحالات من القائمة الجانبية.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
