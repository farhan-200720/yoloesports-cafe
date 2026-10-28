import { createClient } from '@supabase/supabase-js'

// This reads the keys we saved in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// This creates the secure connection to your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
