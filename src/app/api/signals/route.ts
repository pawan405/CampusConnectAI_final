import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { transcription, summary, duration } = await req.json();

    if (!transcription) {
      return NextResponse.json(
        { error: "Transcription is required" },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a demo-mode success response
    if (!supabase) {
      const demoSignal = {
        id: `demo-signal-${Date.now()}`,
        transcription,
        summary,
        duration,
        status: "uploaded_demo",
      };

      return NextResponse.json({
        success: true,
        signal: demoSignal,
        demoMode: true,
      });
    }

    const { data, error } = await supabase
      .from("signals")
      .insert([
        {
          transcription,
          summary,
          duration,
          status: "uploaded",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, signal: data });
  } catch (error: any) {
    console.error("Error uploading signal:", error);

    // Fallback: still acknowledge in demo-friendly way to keep UI smooth.
    // We avoid echoing the original text here for privacy.
    const demoSignal = {
      id: `demo-signal-${Date.now()}`,
      transcription: "hidden-for-privacy",
      summary: "Demo mode: summary unavailable due to backend error.",
      duration: null,
      status: "uploaded_demo_fallback",
    };

    return NextResponse.json({
      success: true,
      signal: demoSignal,
      demoMode: true,
      errorMessage: error.message,
    });
  }
}
