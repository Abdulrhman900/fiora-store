'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { OrderStatus } from '../../../lib/types';

type OrderRow = {
  id: string;
  total_price: number;
  status: OrderStatus;
  created_at?: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data } = await supabase
        .from('orders')
        .select('id,total_price,status,created_at')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

      setOrders((data as OrderRow[] | null) || []);
    };

    void load();
  }, []);

  return (
    <section className="stack">
      <h1>طلباتي</h1>
      {orders.length === 0 ? (
        <p>لا توجد طلبات بعد.</p>
      ) : (
        orders.map((order) => (
          <article className="card" key={order.id}>
            <div className="row">
              <strong>#{order.id.slice(0, 8)}</strong>
              <span>{order.status}</span>
            </div>
            <div className="row">
              <span>{order.total_price} ر.س</span>
              <small>{order.created_at?.slice(0, 10)}</small>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
