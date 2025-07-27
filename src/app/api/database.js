import { createClient } from '@supabase/supabase-js';

// set up database
const url = process.env.DB_URL
const key = process.env.DB_KEY

export const supabase = createClient(url, key)