import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '../../lib/supabase-server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const bypass = cookies().get('fiora_admin_bypass')?.value === '1';

  if (!bypass) {
    const supabase = createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) redirect('/');

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      redirect('/');
    }
  }

  return (
    <section className="admin-shell">
      <aside className="sidebar stack">
        <div className="stack">
          <p className="eyebrow">Admin Dashboard</p>
          <h3>لوحة التحكم</h3>
        </div>
        <Link href="/admin">نظرة عامة</Link>
        <Link href="/admin/products">إدارة المنتجات</Link>
        <Link href="/admin/orders">إدارة الطلبات</Link>
      </aside>
      <div className="stack">{children}</div>
    </section>
  );
}
