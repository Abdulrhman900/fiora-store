import type { Product } from './types';

export const products: Product[] = [
  { id: '1', name: 'بروتين واي', description: 'دعم يومي لبناء العضلات.', price: 189, image: '💪', category: 'supplements' },
  { id: '2', name: 'أوميغا 3', description: 'صحة القلب والمفاصل.', price: 79, image: '🐟', category: 'vitamins' },
  { id: '3', name: 'فيتامين D3', description: 'مناعة وعظام أقوى.', price: 59, image: '☀️', category: 'vitamins' },
  { id: '4', name: 'زبدة فول سوداني', description: 'مصدر دهون صحية ممتاز.', price: 34, image: '🥜', category: 'food' },
  { id: '5', name: 'شوفان فاخر', description: 'فطور متوازن وسريع.', price: 27, image: '🌾', category: 'food' },
  { id: '6', name: 'شيكر احترافي', description: 'خلط سريع بدون تكتلات.', price: 45, image: '🥤', category: 'accessories' },
  { id: '7', name: 'باند مقاومة', description: 'تمارين منزلية فعالة.', price: 39, image: '🧘', category: 'accessories' },
  { id: '8', name: 'كرياتين مونوهيدرات', description: 'قوة وأداء أعلى.', price: 119, image: '⚡', category: 'supplements' },
  { id: '9', name: 'ملتي فيتامين', description: 'احتياج يومي متكامل.', price: 69, image: '💊', category: 'vitamins' },
  { id: '10', name: 'بار بروتين', description: 'سناك عالي البروتين.', price: 12, image: '🍫', category: 'food' },
  { id: '11', name: 'حصيرة يوغا', description: 'راحة وثبات في التمرين.', price: 99, image: '🧘‍♀️', category: 'accessories' },
];

export const bundleProductIds = ['1', '8', '6'];

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
