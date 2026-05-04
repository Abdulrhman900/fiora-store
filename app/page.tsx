import Link from 'next/link';
import AddToCartButton from '../components/AddToCartButton';
import { bundleProductIds, products } from '../lib/data';

export default function HomePage() {
  const bundleItems = products.filter((p) => bundleProductIds.includes(p.id));

  return (
    <section className="stack">
      <div className="hero stack">
        <h1>فيورا: متجر عربي للمكملات ونمط الحياة الصحي</h1>
        <p>
          باقات ذكية، منتجات منتقاة، وتجربة شراء سريعة بالكامل باللغة العربية مع دعم RTL.
        </p>
        <div className="row">
          <Link href="/products" className="btn">تصفح المنتجات</Link>
          <Link href="/bundle" className="btn secondary">عرض الباقة</Link>
        </div>
      </div>

      <section className="stack">
        <h2>باقة البداية</h2>
        <div className="grid">
          {bundleItems.map((item) => (
            <article className="card" key={item.id}>
              <div className="card-emoji">{item.image}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="row">
                <span className="price">{item.price} ر.س</span>
                <AddToCartButton product={item} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack">
        <h2>المنتجات ({products.length})</h2>
        <div className="grid">
          {products.map((product) => (
            <article className="card" key={product.id}>
              <div className="card-emoji">{product.image}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="row">
                <span className="price">{product.price} ر.س</span>
                <Link href={`/products/${product.id}`} className="btn secondary">التفاصيل</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
