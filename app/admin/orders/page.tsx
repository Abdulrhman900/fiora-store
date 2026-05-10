'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { OrderStatus } from '../../../lib/types';

type AdminOrder = {
  id: string;
  customer_name: string;
  phone: string;
  city: string;
  total_price: number;
  status: OrderStatus;
  created_at: string;
};

const statuses: OrderStatus[] = ['pending', 'shipped', 'completed'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      if (response.ok) setOrders(data.orders || []);
    };

    void load();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)));
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <section className="stack">
      <div>
        <p className="eyebrow">إدارة الطلبات</p>
        <h1 className="page-title">طلبات العملاء</h1>
        <p className="page-copy">تغيير حالة الطلبات بين Pending وShipped وCompleted.</p>
      </div>

      <div className="dashboard-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>لا توجد طلبات بعد.</p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.article className="dashboard-row" key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div>
                <strong>{order.customer_name}</strong>
                <div className="small">
                  {order.city} • {order.phone} • {order.created_at.slice(0, 10)}
                </div>
              </div>
              <strong>{order.total_price} ر.س</strong>
              <label className="stack" style={{ minWidth: 180 }}>
                <span className="small">الحالة</span>
                <select className="select" value={order.status} onChange={(e) => void updateStatus(order.id, e.target.value as OrderStatus)}>
                  {statuses.map((status) => (
                    <option value={status} key={status}>
                      {status === 'pending' ? 'قيد الانتظار' : status === 'shipped' ? 'تم الشحن' : 'مكتمل'}
                    </option>
                  ))}
                </select>
              </label>
            </motion.article>
          ))
        )}
      </div>
    </section>
  );
}
