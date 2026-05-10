import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <section className="hero-shell">
      <div className="hero-copy">
        <p className="eyebrow">تم بنجاح</p>
        <h1 className="page-title">تم استلام طلبك</h1>
        <p className="page-copy">شكراً لثقتك في فلورا. سنبدأ تجهيز الطلب فوراً وإرسال التحديثات لك.</p>
        <Link href="/" className="btn">
          العودة للرئيسية
        </Link>
      </div>
      <div className="dashboard-panel">
        <div className="feature-card">
          <strong>الطلب محفوظ</strong>
          <span className="muted">تمت الكتابة إلى Supabase orders table.</span>
        </div>
      </div>
    </section>
  );
}
