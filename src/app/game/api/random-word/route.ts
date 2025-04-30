// app/api/random-word/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    const { language } = await req.json();
   
    try {
        if (!language) {
            return NextResponse.json(
                { error: "Language is required" },
                { status: 400 }
            );
        }

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4.1-nano", // або 'gpt-3.5-turbo'
            messages: [
                {
                    role: "system",
                    content: `Reply with one random simple word in the given language.`,
                },
                {
                    role: "user",
                    content: language,
                },
            ],
            temperature: 1.5,
            max_tokens: 10,
        });

        const word = chatCompletion.choices[0]?.message?.content?.trim();

        if (!word) {
            return NextResponse.json(
                { error: "No word generated" },
                { status: 500 }
            );
        }

        return NextResponse.json({ word });
    } catch (error: any) {
        console.error("Error fetching word:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
