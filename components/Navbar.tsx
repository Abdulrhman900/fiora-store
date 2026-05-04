'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <nav className="nav-links" aria-label="Main">
          <Link href="/">الرئيسية</Link>
          <Link href="/products">المنتجات</Link>
          <Link href="/bundle">الباقة</Link>
          <Link href="/about">عن فيورا</Link>
          <Link href="/contact">تواصل</Link>
        </nav>
        <div className="brand">FIORA</div>
        <div className="nav-actions">
          <Link href="/auth/login">دخول</Link>
          <Link href="/cart" className="cart-link">
            السلة
            <span className="badge" aria-label="items in cart">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
