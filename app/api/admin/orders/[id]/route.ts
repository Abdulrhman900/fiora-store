import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseAdminClient } from '../../../../../lib/supabase-admin';

const isAdmin = () => cookies().get('FLORA_admin_bypass')?.value === '1';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const payload = await request.json();
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from('orders').update(payload).eq('id', params.id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ order: data });
}
