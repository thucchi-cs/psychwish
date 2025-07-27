import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { supabase } from '../database';

export async function POST(req) {
    const data = await req.json();
    console.log(data)
    const { error } = await supabase.from("test").insert({thing: data.thing, qty: data.qty})
    console.log(error)
    return NextResponse.json({error});
}