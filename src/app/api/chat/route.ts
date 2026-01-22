import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const hasGeminiKey = !!GEMINI_API_KEY;
const genAI = hasGeminiKey
  ? new GoogleGenerativeAI(GEMINI_API_KEY as string)
  : null;

function buildFallbackReply(lastUserMessage: string): string {
  const trimmed = (lastUserMessage || "").slice(0, 220);
  return [
    "CampusConnect AI is running in offline demo mode right now, so this reply is generated without external AI APIs.",
    "",
    trimmed
      ? `Based on what you asked about: "${trimmed}", here’s a safe next-step plan:`
      : "Here’s a simple plan you can follow:",
    "",
    "1) Clarify your exact goal for the next 3–6 months (skills, internships, projects).",
    "2) Pick one small, concrete project that matches that goal and finish it end‑to‑end.",
    "3) Document what you build (GitHub + short write‑up) and share it with seniors/mentors for feedback.",
    "",
    "If you share your branch, year, and interests, I can outline a more concrete 3–step roadmap for you."
  ].join("\n");
}

export async function POST(req: Request) {
  let messages: { role: string; content: string }[] = [];

  try {
    const body = await req.json();
    messages = body.messages || [];
  } catch {
    // If parsing fails, still respond deterministically
    const fallback = buildFallbackReply("");
    return NextResponse.json({
      role: "assistant",
      content: fallback,
      meta: { demoMode: true, reason: "invalid_request" },
    });
  }

  const lastMessageContent =
    messages[messages.length - 1]?.content || "my career and college roadmap";

  // If no API key, immediately return deterministic fallback
  if (!hasGeminiKey || !genAI) {
    const fallback = buildFallbackReply(lastMessageContent);
    return NextResponse.json({
      role: "assistant",
      content: fallback,
      meta: { demoMode: true, reason: "missing_gemini_api_key" },
    });
  }

  try {
    // Use gemini-2.5-flash which is available for this API key
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const systemPrompt =
      "You are CampusConnect AI, a helpful mentor for college students. You provide guidance on careers, skills, projects, and internships. Be concise and supportive.";

    // Gemini API expects history to start with 'user' and alternate roles
    let history: any[] = [];
    let lastRole = "";

    for (const m of messages.slice(0, -1)) {
      const role = m.role === "assistant" ? "model" : "user";

      // Skip if it's the same role as the previous one (Gemini requirement)
      if (role === lastRole) continue;

      // Skip leading model messages
      if (history.length === 0 && role !== "user") continue;

      history.push({
        role: role,
        parts: [{ text: m.content }],
      });
      lastRole = role;
    }

    // Ensure the last message in history is 'user' / 'model' compatible
    if (history.length > 0 && history[history.length - 1].role === "user") {
      history.pop();
    }

    const currentPrompt =
      history.length === 0
        ? `${systemPrompt}\n\nUser: ${lastMessageContent}`
        : lastMessageContent;

    const chat = model.startChat({
      history,
    });

    const result = await chat.sendMessage(currentPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ role: "assistant", content: text });
  } catch (error: any) {
    console.error("Chat error:", error);
    const fallback = buildFallbackReply(lastMessageContent);
    return NextResponse.json({
      role: "assistant",
      content: fallback,
      meta: { demoMode: true, reason: "gemini_runtime_error" },
    });
  }
}
