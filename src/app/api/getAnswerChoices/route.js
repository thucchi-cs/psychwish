import { NextResponse } from 'next/server';
import { supabase } from '../database';

// delete an item from database
export async function GET(req) {
    const params = new URL(req.url).searchParams;
    const question_id = params.get('id');
    const { data, error } = await supabase.from("answer_choices").select().eq("question_id", question_id);
    return NextResponse.json({data});
}