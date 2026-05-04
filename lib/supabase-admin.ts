import { createClient } from '@supabase/supabase-js';

function getSafeSupabaseUrl() {
  const candidate = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!candidate) return 'https://example.supabase.co';

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return candidate;
  } catch {
    return 'https://example.supabase.co';
  }

  return 'https://example.supabase.co';
}

export function createSupabaseAdminClient() {
  const supabaseUrl = getSafeSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'service-role-key';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
