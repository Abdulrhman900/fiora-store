export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Profile = {
  id: string;
  full_name: string;
  role: 'customer' | 'admin';
};

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export type CheckoutForm = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: 'cod' | 'card';
  notes: string;
};

export type OrderInsert = {
  user_id?: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  payment_method: 'cod' | 'card';
  notes: string;
  items: CartItem[];
  total_price: number;
  status: OrderStatus;
};
