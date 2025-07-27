import { NextResponse } from 'next/server';
import { supabase } from '../database';

// get all items in database
export async function GET() {
    const { data, error } = await supabase.from("test").select();
    return NextResponse.json({data});
}