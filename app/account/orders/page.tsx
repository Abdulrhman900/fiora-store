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
      <div>
        <p className="eyebrow">طلباتي</p>
        <h1 className="page-title">سجل الطلبات</h1>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>لا توجد طلبات بعد.</p>
        </div>
      ) : (
        <div className="dashboard-list">
          {orders.map((order) => (
            <article className="dashboard-row" key={order.id}>
              <div>
                <strong>#{order.id.slice(0, 8)}</strong>
                <div className="small">{order.created_at?.slice(0, 10)}</div>
              </div>
              <strong>{order.total_price} ر.س</strong>
              <span className="status-badge">
                {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'shipped' ? 'تم الشحن' : 'مكتمل'}
              </span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
