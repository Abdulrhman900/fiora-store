export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageUrl?: string;
  image_url?: string | null;
  category: string;
  featured?: boolean;
  variants?: ProductVariant[];
  accent?: string;
};

export type ProductVariant = {
  name: string;
  options: string[];
};

export type CartItem = Product & {
  quantity: number;
  variantLabel?: string;
};

export type Profile = {
  id: string;
  full_name: string;
  role: 'customer' | 'admin';
};

export type OrderStatus = 'pending' | 'shipped' | 'completed';

export type CheckoutForm = {
  fullName: string;
  phone: string;
  city: string;
  paymentMethod: 'mada' | 'visa' | 'tabby' | 'tamara';
  notes: string;
};

export type OrderInsert = {
  user_id?: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  payment_method: 'mada' | 'visa' | 'tabby' | 'tamara';
  notes: string;
  items: CartItem[];
  total_price: number;
  status: OrderStatus;
};

export type AdminStats = {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
};
