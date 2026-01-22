"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  ArrowLeft,
  Search,
  Zap,
  Target,
  Trophy,
  Users,
  Activity,
  ChevronRight,
  Shield,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import ThreeDBackground from "@/components/ThreeDBackground";

export default function MatchAnalysisPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const analysisMetrics = [
    { label: "Technical Skill Fit", value: "94%", color: "cyan", icon: Brain },
    { label: "Team Dynamic Match", value: "88%", color: "purple", icon: Users },
    { label: "Industry Alignment", value: "92%", color: "blue", icon: Target },
    { label: "Winning Probability", value: "76%", color: "emerald", icon: Rocket },
  ];

  const matchedHackathons = [
    {
      name: "AI Global Challenge",
      matchScore: 98,
      tags: ["Machine Learning", "Python"],
      difficulty: "Advanced",
      reason: "Matches your expertise in PyTorch and recent sentiment analysis projects.",
    },
    {
      name: "FinTech Innovation Summit",
      matchScore: 85,
      tags: ["Blockchain", "Security"],
      difficulty: "Intermediate",
      reason: "Aligns with your 'SecureChain' repository and interest in smart contract security.",
    },
    {
      name: "Eco-Tech Hackathon",
      matchScore: 72,
      tags: ["IoT", "Sustainability"],
      difficulty: "Beginner",
      reason: "Ideal for applying your hardware skills to environmental challenges.",
    },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-white font-sans overflow-x-hidden">
      <ThreeDBackground />

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2 text-white/60 hover:text-white hover:bg-white/5">
              <ArrowLeft className="w-4 h-4" /> Back to Core
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="font-black tracking-tighter text-xl uppercase">Match Analysis</span>
          </div>
        </div>
      </nav>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          {/* Header */}
          <section className="space-y-6">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-4 py-1">
              Analysis Results Generated
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              MATCH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                VERDICT.
              </span>
            </h1>
            <p className="text-white/80 text-xl max-w-2xl font-medium leading-relaxed">
              We analyzed your <span className="text-cyan-400">GitHub repositories</span>, <span className="text-purple-400">project history</span>, and <span className="text-emerald-400">skill endorsements</span>. 
              These recommendations prioritize hackathons where your technical stack guarantees a competitive edge.
            </p>
          </section>

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {analysisMetrics.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black/60 backdrop-blur-3xl border-white/10 p-8 rounded-[32px] hover:border-cyan-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <metric.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">Verified</Badge>
                  </div>
                  <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">{metric.label}</p>
                  <h3 className="text-4xl font-black text-white">{metric.value}</h3>
                </Card>
              </motion.div>
            ))}
          </section>

          {/* Recommendations */}
          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-black tracking-tighter uppercase">Recommended Opportunities</h2>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {matchedHackathons.map((hack, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 rounded-[40px] p-8 h-full flex flex-col hover:bg-white/10 transition-all border-l-4 border-l-cyan-500/50">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-cyan-400 uppercase">Match Score</p>
                        <p className="text-3xl font-black text-white">{hack.matchScore}%</p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mb-4 text-white leading-tight">{hack.name}</h3>
                    
                    <p className="text-white/90 text-sm mb-6 font-medium leading-relaxed">
                      {hack.reason}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {hack.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-cyan-500/10 text-cyan-200 border border-cyan-500/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white/50 uppercase tracking-tighter">Difficulty</span>
                        <span className="text-sm font-bold text-white uppercase">{hack.difficulty}</span>
                      </div>
                      <Button variant="ghost" className="p-0 h-auto text-cyan-400 hover:text-cyan-300 gap-2 font-black text-xs uppercase tracking-widest">
                        Join Event <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Team Analysis CTA */}
          <section>
            <div className="bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-white/20 rounded-[48px] p-12 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="space-y-4">
                <h3 className="text-4xl font-black tracking-tighter uppercase">Optimize Your Team</h3>
                <p className="text-white/80 max-w-md font-medium leading-relaxed">
                  Already have a squad? Let's check your skill balance and predict project compatibility before you sign up.
                </p>
              </div>
              <Button className="h-20 px-12 rounded-3xl bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]">
                Scan Team Chemistry
              </Button>
            </div>
          </section>
        </main>

        <footer className="py-24 text-center border-t border-white/5">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">
            CampusConnect Insight Engine // Analysis Stable
          </p>
        </footer>

    </div>
  );
}
