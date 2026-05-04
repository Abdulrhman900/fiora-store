'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { OrderStatus } from '../../../lib/types';

type AdminOrder = {
  id: string;
  customer_name: string;
  total_price: number;
  status: OrderStatus;
};

const statuses: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('orders')
        .select('id,customer_name,total_price,status')
        .order('created_at', { ascending: false });

      setOrders((data as AdminOrder[] | null) || []);
    };

    void load();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await supabase.from('orders').update({ status }).eq('id', id);
  };

  return (
    <section className="stack">
      <h1>إدارة الطلبات</h1>
      {orders.length === 0 ? (
        <p>لا توجد طلبات حالياً.</p>
      ) : (
        orders.map((order) => (
          <article className="card" key={order.id}>
            <div className="row">
              <strong>{order.customer_name}</strong>
              <span className="price">{order.total_price} ر.س</span>
            </div>
            <label>
              الحالة
              <select
                className="select"
                value={order.status}
                onChange={(e) => void updateStatus(order.id, e.target.value as OrderStatus)}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
          </article>
        ))
      )}
    </section>
  );
}
