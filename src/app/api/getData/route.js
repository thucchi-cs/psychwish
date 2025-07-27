import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const url = process.env.DB_URL
const key = process.env.DB_KEY
console.log("HI")
console.log(key + "\n" + url)
console.log(typeof(key))

const supabase = createClient(url, key)

export async function GET() {
    const { data, error } = await supabase.from("test").select();
    console.log("AAAHHHHHH");
    console.log(NextResponse.json({data}));
    return NextResponse.json({data});
}