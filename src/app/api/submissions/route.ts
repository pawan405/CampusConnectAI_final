import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { signalId, authorityName } = await req.json();

    if (!signalId) {
      return NextResponse.json(
        { error: "Signal ID is required" },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return a demo-mode submission
    if (!supabase) {
      const demoSubmission = {
        id: `demo-submission-${Date.now()}`,
        signal_id: signalId,
        authority_name: authorityName || "Campus Security",
        status: "submitted_demo",
      };

      return NextResponse.json({
        success: true,
        submission: demoSubmission,
        demoMode: true,
      });
    }

    // Insert into submissions table
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .insert([
        {
          signal_id: signalId,
          authority_name: authorityName || "Campus Security",
          status: "submitted",
        },
      ])
      .select()
      .single();

    if (submissionError) throw submissionError;

    // Update signal status
    const { error: updateError } = await supabase
      .from("signals")
      .update({ status: "submitted_to_authorities" })
      .match({ id: signalId });

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    console.error("Error submitting to authorities:", error);

    const demoSubmission = {
      id: `demo-submission-${Date.now()}`,
      signal_id: "unknown",
      authority_name: "Campus Security",
      status: "submitted_demo_fallback",
    };

    return NextResponse.json({
      success: true,
      submission: demoSubmission,
      demoMode: true,
      errorMessage: error.message,
    });
  }
}
