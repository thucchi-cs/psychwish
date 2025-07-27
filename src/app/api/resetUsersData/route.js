import { NextResponse } from 'next/server';
import { supabase } from '../database';

// delete an item from database
export async function POST() {
    const response = await supabase.from("user_answers").delete()
    return NextResponse.json({response});
}