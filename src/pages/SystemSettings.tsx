import React from "react";
import { Link } from "react-router-dom";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SystemSettingsPage() {
  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Background Visuals - Same as Settings page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-white/60 hover:text-white hover:bg-white/[0.06]"
              >
                <ArrowLeft className="w-4 h-4" /> Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-blue-400" />
              <span className="font-bold">System Settings</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Intentionally empty content container */}
        <div className="min-h-[60vh]" />
      </main>
    </div>
  );
}
