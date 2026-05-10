import Image from 'next/image';
import Link from 'next/link';
import { footerLinks, socialLinks } from '../lib/data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand stack">
          <h3>FLORA</h3>
          <p>متجر نسائي أنيق لمنتجات الرياضة ونمط الحياة الصحي.</p>
          <Image src="/payments.png" alt="وسائل الدفع" width={320} height={80} className="payments-image" />
        </div>

        <div className="footer-links">
          <h4>استكشاف</h4>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-links">
          <h4>تابعينا</h4>
          <a href={socialLinks.tiktok} target="_blank" rel="noreferrer">
            TikTok
          </a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>

        <div className="footer-links">
          <h4>تواصل</h4>
          <Link href="/contact">دعم العملاء</Link>
          <Link href="/shipping">الشحن والتوصيل</Link>
        </div>
      </div>
    </footer>
  );
}
