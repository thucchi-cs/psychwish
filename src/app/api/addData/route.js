import { NextResponse } from 'next/server';
import { supabase } from '../database';

// add an item to database
export async function POST(req) {
    const data = await req.json();
    const { error } = await supabase.from("test").insert({thing: data.thing, qty: data.qty})
    return NextResponse.json({error});
}