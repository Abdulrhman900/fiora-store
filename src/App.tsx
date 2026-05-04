/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, Heart, Search, Instagram, Music2 } from 'lucide-react';

export default function App() {
  const products = [
    { id: 1, name: 'طقم لبس رياضي', desc: 'قطعتين بخامة ناعمة', price: '١٠٠', icon: '👕' },
    { id: 2, name: 'زجاجة رياضية ذكية', desc: 'شاشة عرض الحرارة', price: '١٦', icon: '🧴' },
    { id: 3, name: 'حقيبة رياضية', desc: 'تصميم عملي مريح', price: '٣٠', icon: '👜' },
    { id: 4, name: 'حبل قفز', desc: 'تمارين كارديو فعالة', price: '٣٩', icon: '🪢' },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-cream text-ink flex flex-col font-tajawal selection:bg-gold/30">
      {/* Navigation */}
      <nav className="w-full h-20 px-6 md:px-12 flex items-center justify-between border-b border-ink/10 nav-blur sticky top-0 z-50">
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-gold transition-colors">المنتجات</a>
          <a href="#" className="hover:text-gold transition-colors">البوكس</a>
          <a href="#" className="hover:text-gold transition-colors">عن فيورا</a>
          <a href="#" className="hover:text-gold transition-colors">تواصل معنا</a>
        </div>
        
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-3xl font-bold tracking-widest leading-none">FIORA</h1>
          <span className="text-[10px] uppercase tracking-[0.2em] -mt-1 opacity-70">Healthy Life Style</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-l border-ink/10 pl-6 h-8">
            <Search className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
            <Heart className="w-5 h-5 cursor-pointer hover:text-gold transition-colors" />
          </div>
          <div className="relative flex items-center">
            <ShoppingBag className="w-6 h-6 cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">٣</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden border-b border-ink/10">
        {/* Hero Section */}
        <section className="w-full md:w-[55%] bg-ink text-white p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-20 -left-10 font-serif text-[180px] leading-none pointer-events-none select-none"
          >
            ✨
          </motion.div>
          
          <div className="relative z-10 flex flex-col gap-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gold font-medium tracking-widest text-sm uppercase"
            >
              الإصدار الحصري
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl leading-[1.1]"
            >
              بوكس البداية<br/>الرياضية ✨
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg max-w-md leading-relaxed"
            >
              كل احتياجاتك الرياضية في بوكس واحد أنيق ومتكامل. ابدئي رحلتكِ اليوم مع مجموعة فيورا المختارة بعناية.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-8 mt-4"
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-through">٢٧٩ SAR</span>
                <span className="text-3xl font-serif text-gold">٢١٩ SAR</span>
              </div>
              <button className="bg-gold hover:bg-gold-hover text-ink px-10 py-4 font-bold rounded-none transition-all shadow-[8px_8px_0_0_rgba(255,255,255,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none">
                اطلبي البوكس الآن
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            {[
              { icon: '🚚', label: 'شحن سريع' },
              { icon: '🛡️', label: 'جودة مضمونة' },
              { icon: '🎁', label: 'تغليف أنيق' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-[10px] uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Products Section */}
        <section className="w-full md:w-[45%] p-8 md:p-12 flex flex-col bg-cream">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl">أبرز المنتجات</h3>
            <a href="#" className="text-xs border-b border-ink pb-1 hover:text-gold hover:border-gold transition-colors">تسوق الكل</a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 overflow-y-auto">
            {products.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className="product-card bg-white p-4 shadow-sm border border-gray-100 flex flex-col group cursor-pointer"
              >
                <div className="h-40 bg-cream flex items-center justify-center text-5xl mb-4 rounded-sm transition-colors group-hover:bg-gold/10">
                  {product.icon}
                </div>
                <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                <p className="text-xs text-gray-500 mb-3">{product.desc}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-gold font-bold">{product.price} SAR</span>
                  <button className="text-[10px] border border-ink px-3 py-1 hover:bg-ink hover:text-white transition-colors">إضافة</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-auto md:h-24 bg-white border-t border-ink/10 px-6 md:px-12 py-6 md:py-0 flex flex-col md:flex-row items-center justify-between text-[11px] font-medium text-gray-500 gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-right">
          <span>© ٢٠٢٥ FIORA. جميع الحقوق محفوظة</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-ink transition-colors">الشروط والأحكام</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Instagram className="w-4 h-4" /> Instagram
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gold transition-colors">
            <Music2 className="w-4 h-4" /> TikTok
          </a>
        </div>

        <div className="flex gap-4 items-center">
          <span className="uppercase tracking-widest text-[10px] opacity-60">الدفع الآمن:</span>
          <div className="flex gap-2 grayscale opacity-50">
            <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
            <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
            <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
