import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Use gemini-1.5-flash which is more reliable and supports systemInstruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are CampusConnect AI, a helpful mentor for college students. You provide guidance on careers, skills, projects, and internships. Be concise and supportive."
    });

    // Gemini API expects the first message to be from 'user'
    // and roles to alternate between 'user' and 'model'.
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })).filter((m: any, i: number, arr: any[]) => {
      // Ensure the first message is 'user'
      if (i === 0 && m.role !== 'user') return false;
      return true;
    });

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ role: "assistant", content: text });
  } catch (error: any) {
    console.error("Chat error:", error);
    // Log the error details for debugging
    if (error.status === 404) {
      console.error("Model not found. Please check the model name or API key permissions.");
    }
    return NextResponse.json(
      { error: "Failed to generate response", details: error.message },
      { status: 500 }
    );
  }
}
