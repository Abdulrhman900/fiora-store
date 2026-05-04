import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fiora | متجر المكملات الصحية',
  description: 'متجر عربي للمكملات والمنتجات الصحية بنمط حديث.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <CartProvider>
          <Navbar />
          <main className="container page-main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
