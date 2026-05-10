import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import RouteTransition from '../components/RouteTransition';
import { CartProvider } from '../context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: "FLORA | فلورا - Women's Sports Gear",
  description: 'متجر نسائي عربي RTL للأدوات والملابس الرياضية بتجربة سلة ودفع حديثة.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="site-body">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="container page-main">
            <RouteTransition>{children}</RouteTransition>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
