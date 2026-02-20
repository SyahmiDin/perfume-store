// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Key dari fail .env.local yang kita buat tadi
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ini adalah "jambatan" yang akan kita gunakan di seluruh web app kita nanti
export const supabase = createClient(supabaseUrl, supabaseAnonKey);