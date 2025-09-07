export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// initialize the OpenAI client with DeeoSeek API key and base URL
const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: process.env.OPENROUTER_API_KEY
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        // extract chatId and prompt from the request body
        const { chatId, prompt } = await req.json();

        if(!userId) {
            return NextResponse.json({
                success: false,
                message: 'User not authenticated',
            });
        }

        // Find the chat in the database based on chatId and userId
        await connectDB();
        const data = await Chat.findOne({ userId, _id: chatId });

        // create a user message object with the prompt
        const userPrompt = {
            role: 'user',
            content: prompt,
            timestamp: Date.now()
        };

        data.messages.push(userPrompt);

        // call the deepseek API to get a chat completion
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek/deepseek-r1:free",
            store: true,
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now();
        data.messages.push(message);
        data.save();

        return NextResponse.json({ success: true, data: message})

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}