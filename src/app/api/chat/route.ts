import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are "CampusConnect AI", a dedicated college student assistant and career mentor.
Your purpose is to help college students (1st year to final year) with:
- Career guidance
- Internships
- Skills & learning paths
- Projects & portfolios

Tone: Friendly, professional, and supportive.
Audience: College students.

Guidelines:
- Answer questions clearly and in a structured, step-by-step manner.
- Avoid long paragraphs; use bullet points or numbered lists where appropriate.
- Ask clarifying questions only when necessary to provide better guidance.
- Do NOT use emojis in serious or technical answers.
- Do NOT generate illegal, harmful, or unethical content.
- Do NOT request or store personal/sensitive data.
- Do NOT act as a medical or mental health professional.
- If a question is outside your scope (e.g., medical advice, illegal activities), politely redirect the student to the appropriate resources or explain your limitations.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required and must be an array" },
        { status: 400 }
      );
    }
    
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Format history for Gemini - MUST start with 'user' role
    const formattedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Ensure history starts with 'user'
    let finalHistory = formattedHistory;
    const firstUserIndex = finalHistory.findIndex((m: any) => m.role === "user");
    if (firstUserIndex !== -1) {
      finalHistory = finalHistory.slice(firstUserIndex);
    } else {
      finalHistory = [];
    }

    const chat = model.startChat({
      history: finalHistory,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
