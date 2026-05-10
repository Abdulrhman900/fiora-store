'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

const ADMIN_EMAIL = 'admin@FLORA.com';
const ADMIN_PASSWORD = '123456';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (normalizedEmail === ADMIN_EMAIL && normalizedPassword === ADMIN_PASSWORD) {
      document.cookie = 'FLORA_admin_bypass=1; path=/; max-age=2592000; samesite=lax';
      router.push('/admin');
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password: normalizedPassword });
    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.push('/account');
  };

  return (
    <section className="hero-shell auth-shell">
      <div className="hero-copy">
        <p className="eyebrow">تسجيل الدخول</p>
        <h1 className="page-title">مرحباً بكِ في فلورا</h1>
        <p className="page-copy">استخدمي بريدك وكلمة المرور أو بيانات الإدارة المخصصة للوصول السريع إلى لوحة التحكم.</p>
        <div className="hero-badges">
          <span className="pill">admin@FLORA.com / 123456</span>
          <span className="pill">Supabase Auth</span>
        </div>
      </div>

      <motion.form
        className="dashboard-panel"
        onSubmit={submit}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <label className="stack">
          <span>البريد الإلكتروني</span>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="stack">
          <span>كلمة المرور</span>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn" type="submit">
          دخول
        </button>
        {error && <p className="muted">{error}</p>}
      </motion.form>
    </section>
  );
}
