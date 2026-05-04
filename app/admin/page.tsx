import { products } from '../../lib/data';

export default function AdminHomePage() {
  return (
    <section className="stack">
      <h1>لوحة الإدارة</h1>
      <article className="card">
        <p>عدد المنتجات الحالية: {products.length}</p>
        <p>يمكنك إدارة المنتجات والطلبات من القائمة الجانبية.</p>
      </article>
    </section>
  );
}
