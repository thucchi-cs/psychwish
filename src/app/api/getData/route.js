import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { supabase } from '../database';

export async function GET() {
    const { data, error } = await supabase.from("test").select();
    console.log("AAAHHHHHH");
    console.log(NextResponse.json({data}));
    return NextResponse.json({data});
}