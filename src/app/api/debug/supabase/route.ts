import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env' }, { status: 500 });
  }

  const client = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

  const tables = [
    'Post',
    'Faq',
    'ContactSubmission',
    'TeamMember',
    'User',
    'PageContent',
    'SiteSettings'
  ];

  const results: Record<string, any> = {};

  for (const t of tables) {
    try {
      const { error, count } = await client.from(t).select('*', { count: 'exact' });
      if (error) {
        results[t] = { ok: false, error: { message: error.message, code: error.code } };
      } else {
        results[t] = { ok: true, count };
      }
    } catch (err: any) {
      results[t] = { ok: false, exception: err?.message ?? String(err) };
    }
  }

  return NextResponse.json({ supabaseUrl: SUPABASE_URL, results });
}
