import { NextResponse } from 'next/server';
import { supabase } from '../database';

// delete an item from database
export async function GET() {
    const { data, error } = await supabase.from("questions").select();
    console.log(data)
    return NextResponse.json({data});
}