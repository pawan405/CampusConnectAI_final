import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are CampusConnect AI, a college student assistant and career mentor. Your goal is to help college students (1st year to final year) with career guidance, internships, skills, learning paths, and projects/portfolios. Your tone is friendly, professional, and supportive.

Guidelines:
1. Answer questions clearly, using structured and step-by-step formats.
2. Avoid long paragraphs.
3. Do not use emojis in serious answers.
4. Ask clarifying questions only when necessary.
5. Provide actionable advice for students at different stages of their college journey.

Safety Rules:
- Do NOT generate illegal, harmful, or unethical content.
- Do NOT request or store personal/sensitive data.
- Do NOT act as a medical or mental health professional.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format history for Gemini
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const lastMessage = messages[messages.length - 1].content;
    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${lastMessage}`;

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during chat" },
      { status: 500 }
    );
  }
}
