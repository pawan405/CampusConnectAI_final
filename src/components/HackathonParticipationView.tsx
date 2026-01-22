"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Trophy,
  Target,
  Zap,
  Star,
  Users,
  Brain,
  Rocket,
  ArrowRight,
  Shield,
  Activity,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface HackathonParticipationViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorMap = {
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

const bgMap = {
  blue: "bg-blue-500/20 border-blue-500/30",
  emerald: "bg-emerald-500/20 border-emerald-500/30",
  amber: "bg-amber-500/20 border-amber-500/30",
  purple: "bg-purple-500/20 border-purple-500/30",
  cyan: "bg-cyan-500/20 border-cyan-500/30",
};

const iconColorMap = {
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  cyan: "text-cyan-400",
};

const statsData = [
  { label: "Total Joined", value: 12, icon: Trophy, color: "blue" as const },
  { label: "Completed", value: 10, icon: Shield, color: "emerald" as const },
  { label: "Wins/Top Pos", value: 3, icon: Star, color: "amber" as const },
  { label: "Finalists", value: 5, icon: Target, color: "purple" as const },
  { label: "Ongoing", value: 1, icon: Activity, color: "cyan" as const },
];

const barData = [
  { name: "Sem 1", count: 2 },
  { name: "Sem 2", count: 3 },
  { name: "Sem 3", count: 4 },
  { name: "Sem 4", count: 3 },
];

const pieData = [
  { name: "Wins", value: 3, color: "#f59e0b" },
  { name: "Participation", value: 9, color: "#3b82f6" },
];

const domains = ["AI", "Web3", "EdTech", "FinTech", "HealthTech", "Blockchain", "IoT"];

const achievements = [
  { title: "Winner at Global AI Hackathon", desc: "Built a neural network for sentiment analysis on edge devices.", icon: Trophy, color: "amber" as const },
  { title: "Top 10% in Ethereum Global", desc: "Developed a gas-optimized voting protocol.", icon: Star, color: "blue" as const },
  { title: "Collaborated with International Team", desc: "Worked with developers from 4 different countries.", icon: Users, color: "purple" as const },
  { title: "Real-world Prototype Deployed", desc: "Campus safety app used by 500+ students.", icon: Rocket, color: "emerald" as const },
];

const skills = [
  { name: "Teamwork", level: 90 },
  { name: "Problem Solving", level: 95 },
  { name: "Time Management", level: 85 },
  { name: "Full Stack Dev", level: 80 },
];

export function HackathonParticipationView({ isOpen, onClose }: HackathonParticipationViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-black/95 border-white/10 backdrop-blur-2xl p-0 gap-0 flex flex-col rounded-[32px] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <DialogHeader className="p-8 pb-4 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Trophy className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-black tracking-tighter text-white uppercase">Hackathon Participation</DialogTitle>
              <DialogDescription className="text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">Neural Performance Analytics</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-8 pt-4">
          <div className="space-y-12">
            {/* Participation Overview */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {statsData.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center group hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <stat.icon className={`w-5 h-5 mb-2 ${colorMap[stat.color]} group-hover:scale-110 transition-transform`} />
                    <span className="text-2xl font-black text-white">{stat.value}</span>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* AI Summary */}
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl opacity-50" />
              <div className="relative p-6 rounded-[24px] bg-white/5 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">AI Performance Synthesis</h3>
                </div>
                <p className="text-lg text-white/90 leading-relaxed font-medium">
                  “You have actively participated in multiple hackathons, showing strong consistency and competitive spirit. 
                  Your performance is strongest in <span className="text-blue-400">problem-solving</span> and <span className="text-purple-400">team collaboration</span>. 
                  You demonstrate a unique ability to bridge the gap between complex backend logic and user-centric design.”
                </p>
              </div>
            </section>

            {/* Visual Insights */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-[24px] bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <BarChartIcon className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Velocity per Semester</h3>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-6 rounded-[24px] bg-white/5 border border-white/10 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <PieChartIcon className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Win Distribution</h3>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-[180px] w-[180px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black text-white">25%</span>
                      <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Win Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Tag Clusters */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-blue-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Domain Exposure</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-4 py-2 rounded-full border-white/10 bg-white/5 text-white/70 hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default"
                  >
                    {domain}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Highlighted Achievements */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Key Highlights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex gap-4 group hover:bg-white/10 transition-all">
                    <div className={`w-12 h-12 shrink-0 rounded-xl ${bgMap[item.color]} flex items-center justify-center`}>
                      <item.icon className={`w-6 h-6 ${iconColorMap[item.color]}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Learning & Skill Impact */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Skill Growth Impact</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-white/60">{skill.name}</span>
                      <span className="text-emerald-400">+{skill.level}% Improvement</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Future Suggestions */}
            <section className="p-8 rounded-[32px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-transparent border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-white" />
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">AI Coaching: Next Steps</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Participate in higher-difficulty international hackathons to test your scale limits.",
                  "Focus on taking Leadership/Team Lead roles to develop project management skills.",
                  "Target domain-specific challenges in Web3 or FinTech where your skill set shows high affinity."
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-150 transition-transform" />
                    <p className="text-sm text-white/80 font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.3em] hover:text-blue-400 transition-colors">
                Explore Matching Hackathons <ArrowRight className="w-3 h-3" />
              </button>
            </section>
          </div>
        </ScrollArea>

        <div className="p-8 pt-4 border-t border-white/5 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest transition-all"
          >
            Close Analysis
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
