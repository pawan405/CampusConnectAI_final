import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[supabase] SUPABASE_URL / SUPABASE_ANON_KEY missing. Running in demo fallback mode without database writes."
    );
  }
}

export { supabase };
