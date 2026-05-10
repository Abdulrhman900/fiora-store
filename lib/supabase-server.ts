import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

function getSafeSupabaseUrl() {
  const candidate = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!candidate) return 'https://example.supabase.co';
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return candidate;
    return 'https://example.supabase.co';
  } catch {
    return 'https://example.supabase.co';
  }
}

export const createSupabaseServerClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    getSafeSupabaseUrl(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // Ignore write errors in server components.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch {
            // Ignore write errors in server components.
          }
        },
      },
    }
  );
};
