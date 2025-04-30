// app/api/word-similarity/route.ts
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { word1, word2 } = await req.json();
        console.log(word1, word2);

        if (!word1 || !word2) {
            return NextResponse.json(
                { error: "Both word1 and word2 are required" },
                { status: 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-nano",
            messages: [
                {
                    role: "system",
                    content:
                        "Rate similarity of two words from 1 (same) to 1000 (unrelated), only number.",
                },
                {
                    role: "user",
                    content: `"${word1}" vs "${word2}"`,
                },
            ],
            temperature: 0,
            max_tokens: 5,
        });

        const content = completion.choices[0].message?.content?.trim() || "";
        const score = parseInt(content, 10);
        if (isNaN(score)) {
            return NextResponse.json(
                { error: "Invalid score format returned by model" },
                { status: 500 }
            );
        }

        return NextResponse.json({ score });
    } catch (error: any) {
        console.error("Similarity error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
