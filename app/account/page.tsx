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
    <section className="stack">
      <h1>حسابي</h1>
      <article className="card stack">
        <p>البريد: {email}</p>
        <Link href="/account/orders" className="btn">طلباتي</Link>
      </article>
    </section>
  );
}
