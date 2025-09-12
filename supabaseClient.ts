import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ofhppaatiapifxexenok.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9maHBwYWF0aWFwaWZ4ZXhlbm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTYzODEsImV4cCI6MjA3MzI3MjM4MX0.Pn5TjsVp4zhNP_6jv6GZ6qA9xfxmPsHwZeETj3tRSYM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)