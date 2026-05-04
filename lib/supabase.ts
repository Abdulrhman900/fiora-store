import { createClient } from '@supabase/supabase-js';

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

const supabaseUrl = getSafeSupabaseUrl();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
