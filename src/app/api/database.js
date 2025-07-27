import { createClient } from '@supabase/supabase-js';

const url = process.env.DB_URL
const key = process.env.DB_KEY
console.log("HI")
console.log(key + "\n" + url)
console.log(typeof(key))

export const supabase = createClient(url, key)