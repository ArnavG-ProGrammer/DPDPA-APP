import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Null-safe: returns null if env vars are not configured
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project")
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type UserProfile = {
  id: string;
  email: string | undefined;
  full_name?: string;
  avatar_url?: string;
};
