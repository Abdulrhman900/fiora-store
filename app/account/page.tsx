'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AccountPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || 'ضيف'));
  }, []);

  return (
    <section className="hero-shell">
      <div className="hero-copy">
        <p className="eyebrow">حسابي</p>
        <h1 className="page-title">لوحة الحساب</h1>
        <p className="page-copy">إدارة الطلبات والبيانات الأساسية من حسابك الشخصي.</p>
        <div className="hero-badges">
          <span className="pill">{email || 'جارٍ التحميل...'}</span>
        </div>
        <Link href="/account/orders" className="btn">
          طلباتي
        </Link>
      </div>
      <div className="dashboard-panel">
        <div className="feature-card">
          <strong>متابعة الطلبات</strong>
          <span className="muted">عرض الطلبات السابقة والحالية في مكان واحد.</span>
        </div>
        <div className="feature-card">
          <strong>تجربة عربية</strong>
          <span className="muted">نفس الواجهة النظيفة المخصصة لباقي المتجر.</span>
        </div>
      </div>
    </section>
  );
}
