import type { Product } from './types';

export const socialLinks = {
  tiktok: 'https://www.tiktok.com/@mohammedalotaibi7632?_r=1&_t=ZS-965HMqPAGKu',
  instagram: 'https://www.instagram.com/ltyby55722?igsh=MWhyM3lpdnhqNnB6bw%3D%3D&utm_source=qr',
};

export const products: Product[] = [
  {
    id: '1',
    slug: 'sports-starter-box',
    name: 'بوكس البداية الرياضية ✨',
    description:
      'كل احتياجاتك الرياضية في بوكس واحد أنيق ومتكامل، يجمع بين الراحة والعملية ليكون خيارك المثالي لبدء أو تطوير روتينك الرياضي بكل سهولة.',
    price: 279,
    category: 'featured',
    featured: true,
    accent: 'from-fuchsia-500 via-purple-600 to-pink-400',
    imageUrl: '/logo.png',
  },
  {
    id: '2',
    slug: 'sports-set',
    name: 'طقم لبس رياضي',
    description:
      'قطعتين (ليقنز + تيشيرت) طقم مريح وعصري يمنحك حرية الحركة أثناء التمرين، بخامة ناعمة تمتص العرق وتناسب جميع الأنشطة الرياضية.',
    price: 100,
    category: 'clothing',
    imageUrl: '',
    variants: [{ name: 'المقاس', options: ['S', 'M', 'L', 'XL'] }],
    accent: 'from-purple-500 via-fuchsia-500 to-rose-400',
  },
  {
    id: '3',
    slug: 'headband',
    name: 'ربطة رأس',
    description: 'ربطة رأس أنيقة تثبت الشعر وتمنع التعرق من الإزعاج، مثالية للتمارين اليومية.',
    price: 12,
    category: 'accessories',
    variants: [{ name: 'اللون', options: ['رمادي', 'ابيض', 'بنفسجي', 'اسود'] }],
    accent: 'from-slate-500 via-purple-500 to-pink-300',
  },
  {
    id: '4',
    slug: 'lunch-box',
    name: 'لانش بوكس',
    description: 'علبة طعام عملية وخفيفة تحافظ على وجبتك طازجة.',
    price: 18,
    category: 'home',
    accent: 'from-pink-400 via-rose-500 to-purple-500',
  },
  {
    id: '5',
    slug: 'fitness-gloves',
    name: 'قفازات رياضية',
    description: 'قفازات مصممة لحماية اليدين وتوفير قبضة قوية أثناء التمارين، لراحة وأداء أفضل.',
    price: 30,
    category: 'accessories',
    accent: 'from-fuchsia-500 via-purple-500 to-slate-700',
  },
  {
    id: '6',
    slug: 'jump-rope',
    name: 'حبل القفز',
    description: 'حبل قفز خفيف وسهل الاستخدام، مثالي لتمارين الكارديو وحرق السعرات في أي وقت.',
    price: 39,
    category: 'fitness',
    accent: 'from-purple-400 via-pink-500 to-rose-400',
  },
  {
    id: '7',
    slug: 'sport-socks',
    name: 'جوارب رياضية',
    description: 'جوارب مريحة بخامة ناعمة ومرنة، توفر دعمًا للقدم وتناسب جميع أنواع التمارين.',
    price: 20,
    category: 'clothing',
    variants: [{ name: 'اللون', options: ['وردي', 'ابيض', 'اسود', 'رمادي', 'بيج'] }],
    accent: 'from-slate-500 via-pink-400 to-purple-500',
  },
  {
    id: '8',
    slug: 'resistance-belt',
    name: 'حزام المقاومه',
    description: 'حزام مرن وخفيف يساعد على تنويع التمارين وتقوية العضلات بسهولة في المنزل أو النادي.',
    price: 15,
    category: 'fitness',
    accent: 'from-rose-500 via-purple-500 to-fuchsia-500',
  },
  {
    id: '9',
    slug: 'sports-bag',
    name: 'حقيبة رياضية',
    description: 'حقيبة عملية بتصميم مريح ومساحة مناسبة لحمل احتياجاتك الرياضية اليومية بكل ترتيب.',
    price: 30,
    category: 'bags',
    accent: 'from-purple-700 via-slate-700 to-pink-500',
  },
  {
    id: '10',
    slug: 'smart-bottle',
    name: 'زجاجة رياضية ذكية',
    description:
      'زجاجة أنيقة وعملية مزودة بشاشة رقمية لعرض درجة حرارة المشروب، تحافظ على مشروبك مناسبًا طوال اليوم وترافقك في النادي أو أثناء التنقل.',
    price: 16,
    category: 'accessories',
    accent: 'from-fuchsia-400 via-purple-500 to-slate-700',
  },
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
