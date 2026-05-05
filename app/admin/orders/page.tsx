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
  payment_method: string;
  items: any[];
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
        <p className="page-copy">مراجعة الطلبات الحديثة وتغيير حالتها.</p>
      </div>

      <div className="dashboard-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>لا توجد طلبات بعد.</p>
          </div>
        ) : (
          orders.map((order) => (
            <motion.article className="dashboard-row" key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 300px' }}>
                <strong style={{ fontSize: '1.1rem' }}>{order.customer_name}</strong>
                <div className="small muted" style={{ marginTop: '0.25rem' }}>
                  {order.id.slice(0, 8)} • {order.city} • {order.phone}
                </div>
                <div className="small" style={{ marginTop: '0.5rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '4px' }}>
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx}> {item.quantity}x {item.name} </div>
                  ))}
                </div>
              </div>
              <div className="stack" style={{ flex: '0 0 auto', alignItems: 'flex-end', marginLeft: 'auto' }}>
                <strong style={{ fontSize: '1.25rem', color: '#10b981' }}>{order.total_price} ر.س</strong>
                <div className="small">طريقة الدفع: {order.payment_method === 'cod' ? 'عند الاستلام' : 'بطاقة / إلكتروني'}</div>
              </div>
              <label className="stack" style={{ minWidth: 150, paddingRight: '1rem', borderRight: '1px solid #eee' }}>
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
