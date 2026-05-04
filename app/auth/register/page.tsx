'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <section className="stack">
      <h1>إنشاء حساب</h1>
      <form className="card stack" onSubmit={submit}>
        <label>
          الاسم
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          البريد الإلكتروني
          <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          كلمة المرور
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn" type="submit">تسجيل</button>
        {error && <p>{error}</p>}
      </form>
    </section>
  );
}
