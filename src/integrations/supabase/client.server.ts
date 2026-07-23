import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Server-side Supabase client. Uses the service-role key so server functions
// can write rows on behalf of guest IDs (Decido is a guest-only app — no
// `auth.users` rows are ever created, so RLS-aware anon/auth clients can't be
// the source of truth here). Never expose this module to the browser bundle.
const SUPABASE_URL =
  process.env.SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL ??
  process.env.SUPABASE_URL_FALLBACK;

const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // Don't throw at import time — let the calling server fn surface a clearer
  // error. We just make the misconfiguration loud during server boot.
  console.error(
    '[Supabase server] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
      'Server functions that touch Supabase will fail until both are set.',
  );
}

let _supabaseAdmin: SupabaseClient<Database> | undefined;

export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient<Database>(
      SUPABASE_URL ?? '',
      SUPABASE_SERVICE_ROLE_KEY ?? '',
      {
        auth: {
          // Server-side clients never persist sessions; the service role bypasses
          // RLS by design.
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );
  }
  return _supabaseAdmin;
}

// Convenience export for the existing `import("@/integrations/supabase/client.server")`
// shape that the rest of the codebase already uses.
export const supabaseAdmin = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    const client = getSupabaseAdmin();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
