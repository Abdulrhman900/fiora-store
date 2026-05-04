import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <section className="stack">
      <h1>تم استلام طلبك بنجاح</h1>
      <p>شكراً لك. سنبدأ تجهيز الطلب فوراً.</p>
      <Link href="/" className="btn">العودة للرئيسية</Link>
    </section>
  );
}
