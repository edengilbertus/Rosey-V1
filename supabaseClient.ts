import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase: ReturnType<typeof createClient> | null = null;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found in environment variables')
} else {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export { supabase }