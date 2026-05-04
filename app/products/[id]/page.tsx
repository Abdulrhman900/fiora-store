import { notFound } from 'next/navigation';
import AddToCartButton from '../../../components/AddToCartButton';
import { products } from '../../../lib/data';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <section className="stack">
      <h1>{product.name}</h1>
      <article className="card">
        <div className="card-emoji">{product.image}</div>
        <p>{product.description}</p>
        <div className="row">
          <span className="price">{product.price} ر.س</span>
          <AddToCartButton product={product} />
        </div>
      </article>
    </section>
  );
}
