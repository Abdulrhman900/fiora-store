'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <nav className="nav-links" aria-label="Main">
          <Link href="/" className="brand-link">
            <Image src="/logo.png" alt="شعار FLORA" width={42} height={42} priority />
            <span>
              <strong>FLORA</strong>
            </span>
          </Link>
          <div className="nav-menu">
            <Link href="/products">المنتجات</Link>
            <Link href="/bundle">البوكس</Link>
            <Link href="/about">من نحن</Link>
            <Link href="/faq">الأسئلة الشائعة</Link>
          </div>
        </nav>
        <div className="nav-actions">
          <Link href="/auth/login" className="nav-pill">
            تسجيل الدخول
          </Link>
          <button type="button" className="nav-pill cart-link" onClick={openCart}>
            <ShoppingBag size={16} />
            <span>السلة</span>
            <span className="badge" aria-label="items in cart">
              {itemCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
