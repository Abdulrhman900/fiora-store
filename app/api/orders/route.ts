import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '../../../lib/supabase-admin';
import type { OrderInsert } from '../../../lib/types';

const blockedNames = new Set(['مجموعة دمبل خفيفة', 'حقيبة عملية', 'حقيبة رياضية']);
const blockedSlugs = new Set(['light-dumbbells', 'practical-bag', 'sports-bag']);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OrderInsert;

    if (!payload?.customer_name || !payload?.phone || !payload?.city || !Array.isArray(payload?.items) || payload.items.length === 0) {
      return NextResponse.json({ error: 'بيانات الطلب غير مكتملة.' }, { status: 400 });
    }

    const safeItems = payload.items.filter((item) => !blockedNames.has(item.name) && !blockedSlugs.has(item.slug));
    if (safeItems.length === 0) {
      return NextResponse.json({ error: 'لا يمكن إنشاء طلب بمنتجات محذوفة.' }, { status: 400 });
    }

    const total = safeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: null,
        customer_name: payload.customer_name,
        phone: payload.phone,
        city: payload.city,
        address: payload.address || 'Map Pin',
        payment_method: payload.payment_method,
        notes: payload.notes || '',
        items: safeItems,
        total_price: total,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, orderId: data?.id });
  } catch {
    return NextResponse.json({ error: 'تعذر معالجة الطلب.' }, { status: 500 });
  }
}
