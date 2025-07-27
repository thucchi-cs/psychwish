// /api/wishes/ai-responses/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: 'system', content: 'You are a thoughtful and supportive AI that gives encouragement and insights on wishes. Provide a poetic or artistic reflection, a realistic action plan, a humorous twist, a generated visualization, and a collaborative follow-up.' },
        { role: 'user', content: prompt }, 
      ],
    });

    const responseText = completion.choices[0]?.message?.content ?? "No response";

    return NextResponse.json({ output: responseText }, { status: 200 });
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json({ error: "Failed to generate reflection." }, { status: 500 });
  }
}
