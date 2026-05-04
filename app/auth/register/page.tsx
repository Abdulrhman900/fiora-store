'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const { error: registerError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (registerError) {
      setError(registerError.message);
      return;
    }

    router.push('/auth/login');
  };

  return (
    <section className="hero-shell auth-shell">
      <div className="hero-copy">
        <p className="eyebrow">إنشاء حساب</p>
        <h1 className="page-title">انضمي إلى تجربة فيورا</h1>
        <p className="page-copy">حساب عربي بسيط وسريع لتتبع الطلبات وإتمام الشراء داخل المتجر.</p>
      </div>

      <motion.form className="dashboard-panel" onSubmit={submit} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
        <label className="stack">
          <span>الاسم</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="stack">
          <span>البريد الإلكتروني</span>
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="stack">
          <span>كلمة المرور</span>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn" type="submit">
          تسجيل
        </button>
        {error && <p className="muted">{error}</p>}
      </motion.form>
    </section>
  );
}
