import { NextResponse } from 'next/server';
import { supabase } from '../database';

// delete an item from database
export async function POST(req) {
    const data = await req.json();
    const response = await supabase.from("test").delete().eq("thing", data.thing)
    return NextResponse.json({response});
}