"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Brain,
  Mic,
  MicOff,
  Upload,
  FileAudio,
  Play,
  Pause,
  Send,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Volume2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const previousReports = [
  {
    id: "RPT-001",
    status: "Resolved",
    date: "Dec 15, 2024",
    summary: "Bullying incident in library",
    category: "Harassment",
  },
  {
    id: "RPT-002",
    status: "In Review",
    date: "Dec 18, 2024",
    summary: "Unsafe conditions in lab building",
    category: "Safety",
  },
  {
    id: "RPT-003",
    status: "Pending",
    date: "Dec 20, 2024",
    summary: "Discrimination complaint",
    category: "Discrimination",
  },
];

export default function SilentScreamPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));

    setTranscription(
      "I want to report an incident that happened yesterday near the main auditorium. There was a group of students who were harassing a junior student. The victim seemed very distressed and I think the administration should know about this. This has been happening repeatedly and needs to stop."
    );

    await new Promise((r) => setTimeout(r, 1500));

    setAiSummary(
      "Reported harassment incident near main auditorium involving a group targeting a junior student. Described as repeated behavior. Witness observed victim in distress. Recommends administrative attention."
    );
    setIsProcessing(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setIsProcessing(true);
      await new Promise((r) => setTimeout(r, 2500));

      setTranscription(
        "There is an ongoing issue with the lighting in the parking lot near building B. Multiple students have complained about feeling unsafe walking there at night. Last week, someone almost had an accident because they couldn't see properly. This needs urgent attention."
      );

      await new Promise((r) => setTimeout(r, 1500));

      setAiSummary(
        "Infrastructure safety concern: Inadequate lighting in Building B parking lot. Multiple complaints received. Near-accident reported due to visibility issues. Urgent maintenance required."
      );
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setIsProcessing(false);
  };

  const resetForm = () => {
    setAudioFile(null);
    setTranscription("");
    setAiSummary("");
    setSubmitted(false);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-rose-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[100px]" />
      </div>
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white/60 hover:text-white hover:bg-white/[0.06]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </Link>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent hidden sm:block">
                  CampusConnect AI
                </span>
              </Link>
            </div>
            <Badge className="bg-rose-500/15 text-rose-400 border border-rose-500/20 gap-1">
              <Shield className="w-3 h-3" /> 100% Anonymous
            </Badge>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-6">
            <Mic className="w-4 h-4" />
            Anonymous Voice Reporting
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Silent{" "}
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Scream
            </span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Your voice matters. Report concerns anonymously through voice
            recording. Our AI transcribes and summarizes your report while
            protecting your identity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="bg-white/[0.02] border border-white/[0.06] shadow-xl">
                    <CardContent className="p-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Report Submitted Successfully
                      </h2>
                      <p className="text-white/60 mb-2">
                        Your report ID:{" "}
                        <span className="font-mono font-bold text-emerald-400">
                          RPT-
                          {Math.random()
                            .toString(36)
                            .substring(2, 8)
                            .toUpperCase()}
                        </span>
                      </p>
                      <p className="text-white/40 text-sm mb-8">
                        Your identity remains completely anonymous. You can
                        track the status using the report ID.
                      </p>
                      <Button
                        onClick={resetForm}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                      >
                        Submit Another Report
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <Card className="bg-white/[0.02] border border-white/[0.06] shadow-xl overflow-hidden">
                    <CardHeader className="border-b border-white/[0.06]">
                      <CardTitle className="flex items-center gap-2 text-lg text-white">
                        <Volume2 className="w-5 h-5 text-rose-400" />
                        Voice Input
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={isRecording ? stopRecording : startRecording}
                          disabled={isProcessing}
                          className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isRecording
                              ? "bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30"
                              : "bg-white/[0.04] hover:bg-rose-500/20 border border-white/[0.06]"
                          }`}
                        >
                          {isRecording && (
                            <motion.div
                              className="absolute inset-0 rounded-full bg-rose-500/30"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                          {isRecording ? (
                            <MicOff className="w-12 h-12 text-white relative z-10" />
                          ) : (
                            <Mic
                              className={`w-12 h-12 ${
                                isProcessing ? "text-white/30" : "text-rose-400"
                              } relative z-10`}
                            />
                          )}
                        </motion.button>

                        <p className="mt-6 text-white/60 font-medium">
                          {isRecording ? (
                            <span className="text-rose-400 flex items-center gap-2">
                              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                              Recording... {formatTime(recordingTime)}
                            </span>
                          ) : (
                            "Click to start recording"
                          )}
                        </p>

                        <div className="flex items-center gap-4 mt-8 w-full max-w-md">
                          <div className="flex-1 h-px bg-white/[0.06]" />
                          <span className="text-white/30 text-sm">or</span>
                          <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="audio/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isProcessing || isRecording}
                          className="mt-6 gap-2 bg-white/[0.04] border-white/[0.06] text-white/70 hover:bg-white/[0.08] hover:text-white"
                        >
                          <Upload className="w-4 h-4" />
                          Upload Audio File
                        </Button>

                        {audioFile && (
                          <div className="mt-4 flex items-center gap-3 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                            <FileAudio className="w-5 h-5 text-rose-400" />
                            <span className="text-sm text-white/60">
                              {audioFile.name}
                            </span>
                            <button
                              onClick={() => setAudioFile(null)}
                              className="text-white/30 hover:text-white/60"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-white/[0.02] border border-white/[0.06] shadow-xl">
                        <CardContent className="p-8 text-center">
                          <Loader2 className="w-12 h-12 text-rose-400 animate-spin mx-auto mb-4" />
                          <p className="text-white/70 font-medium">
                            Processing your voice input...
                          </p>
                          <p className="text-white/40 text-sm mt-2">
                            AI is transcribing and generating summary
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {transcription && !isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="bg-white/[0.02] border border-white/[0.06] shadow-xl">
                        <CardHeader className="border-b border-white/[0.06]">
                          <CardTitle className="flex items-center gap-2 text-lg text-white">
                            <FileAudio className="w-5 h-5 text-cyan-400" />
                            Transcription
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-10 h-10 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-400"
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5 ml-0.5" />
                              )}
                            </button>
                            <div className="flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                initial={{ width: "0%" }}
                                animate={{ width: isPlaying ? "100%" : "35%" }}
                                transition={{ duration: isPlaying ? 10 : 0 }}
                              />
                            </div>
                            <span className="text-sm text-white/40">0:45</span>
                          </div>
                          <Textarea
                            value={transcription}
                            onChange={(e) => setTranscription(e.target.value)}
                            className="min-h-[120px] bg-white/[0.02] border-white/[0.06] text-white/80"
                            placeholder="Transcription will appear here..."
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {aiSummary && !isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/30 shadow-xl">
                        <CardHeader className="border-b border-white/10">
                          <CardTitle className="flex items-center gap-2 text-lg text-white">
                            <Sparkles className="w-5 h-5 text-violet-400" />
                            AI Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                          <p className="text-white/70 leading-relaxed">
                            {aiSummary}
                          </p>
                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-white/50 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            Review the summary before submitting
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {aiSummary && !isProcessing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-end gap-4"
                    >
                      <Button
                        variant="outline"
                        onClick={resetForm}
                        className="bg-white/[0.04] border-white/[0.06] text-white/70 hover:bg-white/[0.08]"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Submit Report
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/[0.02] border border-white/[0.06] shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-white/40" />
                  Your Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousReports.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold text-white/60">
                        {report.id}
                      </span>
                      <Badge
                        className={`text-xs ${
                          report.status === "Resolved"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                            : report.status === "In Review"
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/20"
                            : "bg-white/[0.04] text-white/50 border-white/[0.06]"
                        }`}
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/70 mb-1">
                      {report.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">
                        {report.date}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-white/[0.04] text-white/50"
                      >
                        {report.category}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 shadow-xl">
              <CardContent className="p-6">
                <Shield className="w-10 h-10 mb-4 text-cyan-400" />
                <h3 className="text-lg font-bold mb-2 text-white">
                  Your Privacy Matters
                </h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                    <span>No personal data is collected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                    <span>Voice recordings are processed locally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                    <span>Only transcribed text is stored</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" />
                    <span>End-to-end encryption enabled</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
