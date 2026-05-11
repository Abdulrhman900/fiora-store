import type { Product } from './types';

export const socialLinks = {
  tiktok: 'https://www.tiktok.com/@mohammedalotaibi7632?_r=1&_t=ZS-965HMqPAGKu',
  instagram: 'https://www.instagram.com/ltyby55722?igsh=MWhyM3lpdnhqNnB6bw%3D%3D&utm_source=qr',
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'light-dumbbells',
    name: 'مجموعة دمبل خفيفة',
    description: 'مجموعة دمبل خفيفة مثالية للتمارين اليومية وتقوية العضلات براحة.',
    price: 89,
    category: 'fitness',
    featured: true,
    variants: [{ name: 'الوزن', options: ['1kg', '1.5kg', '2kg'] }, { name: 'اللون', options: ['وردي', 'أخضر فاتح', 'أزرق فاتح'] }],
    accent: 'from-fuchsia-500 via-purple-600 to-pink-400',
    imageUrl: '/images/dumbbells.jpg',
  },
  {
    id: '2',
    slug: 'sport-socks',
    name: 'جوارب رياضية',
    description: 'جوارب مريحة وعملية، توفر دعماً ممتازاً للقدم أثناء التمارين.',
    price: 25,
    category: 'clothing',
    imageUrl: '/images/sports_socks.jpg',
    variants: [{ name: 'اللون', options: ['أبيض', 'أسود', 'رمادي'] }],
    accent: 'from-purple-500 via-fuchsia-500 to-rose-400',
  },
  {
    id: '3',
    slug: 'jump-rope',
    name: 'حبل قفز',
    description: 'حبل قفز خفيف وسريع، مثالي لتمارين الكارديو وحرق السعرات.',
    price: 35,
    category: 'fitness',
    imageUrl: '/images/jump_rope.jpg',
    accent: 'from-slate-500 via-purple-500 to-pink-300',
  },
  {
    id: '4',
    slug: 'resistance-band',
    name: 'حزام مقاومة',
    description: 'حزام مقاومة قوي ومتين لتنويع تمارينك في البيت أو النادي.',
    price: 45,
    category: 'fitness',
    imageUrl: '/images/resistance_band.jpg',
    accent: 'from-pink-400 via-rose-500 to-purple-500',
  },
  {
    id: '5',
    slug: 'practical-bag',
    name: 'حقيبة عملية',
    description: 'حقيبة رياضية واسعة وعصرية تتسع لجميع أدواتك ومستلزماتك اليومية.',
    price: 120,
    category: 'bags',
    imageUrl: '/images/practical_bag.jpg',
    accent: 'from-fuchsia-500 via-purple-500 to-slate-700',
  },
  {
    id: '6',
    slug: 'headband',
    name: 'ربطة راس',
    description: 'ربطة رأس ناعمة تمتص العرق وتحافظ على ثبات شعرك أثناء التمرين.',
    price: 15,
    category: 'accessories',
    imageUrl: '/images/headband.jpg',
    accent: 'from-purple-400 via-pink-500 to-rose-400',
  },
  {
    id: '7',
    slug: 'smart-bottle',
    name: 'زجاجة رياضية ذكية',
    description: 'زجاجة رياضية تحافظ على برودة المياه وتأتي بتصميم ذكي ومضاد للتسريب.',
    price: 50,
    category: 'accessories',
    imageUrl: '/images/smart_bottle.jpg',
    accent: 'from-slate-500 via-pink-400 to-purple-500',
  }

];

export const featuredProduct = products[0];
export const bundleProductIds = ['1', '2', '6'];

export const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'المنتجات' },
  { href: '/bundle', label: 'البوكس' },
  { href: '/about', label: 'من نحن' },
  { href: '/faq', label: 'الأسئلة الشائعة' },
];

export const footerLinks = [
  { href: '/about', label: 'من نحن' },
  { href: '/terms', label: 'الشروط والأحكام' },
  { href: '/returns', label: 'سياسة الاسترجاع' },
  { href: '/faq', label: 'الأسئلة الشائعة' },
];

export const saudiCities = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الظهران',
  'الطائف',
  'تبوك',
  'بريدة',
  'حائل',
  'أبها',
  'جازان',
  'نجران',
  'الجبيل',
  'ينبع',
  'القطيف',
  'الاحساء',
  'عرعر',
  'سكاكا',
  'الباحة',
  'القنفذة',
  'خميس مشيط',
  'صبيا',
  'الرس',
  'بيشة',
  'رفحاء',
  'القريات',
];

