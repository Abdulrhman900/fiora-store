import Link from 'next/link';
import AddToCartButton from '../../components/AddToCartButton';
import { products } from '../../lib/data';

export default function ProductsPage() {
  return (
    <section className="stack">
      <h1>كل المنتجات</h1>
      <p>تم العثور على {products.length} منتجاً.</p>
      <div className="grid">
        {products.map((product) => (
          <article className="card" key={product.id}>
            <div className="card-emoji">{product.image}</div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="row">
              <span className="price">{product.price} ر.س</span>
              <AddToCartButton product={product} />
            </div>
            <Link href={`/products/${product.id}`} className="btn secondary">عرض المنتج</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
