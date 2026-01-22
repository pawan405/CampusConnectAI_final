"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  ArrowLeft,
  Sparkles,
  Target,
  Rocket,
  LayoutGrid,
  Code,
  Users,
  TrendingUp,
  Radar,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper components for visualizations
const RadarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const val = (d.value / 100) * radius;
    return {
      x: center + val * Math.cos(angle),
      y: center + val * Math.sin(angle),
    };
  });

  const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") + " Z";

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {[0.2, 0.4, 0.6, 0.8, 1].map((step, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * step}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          d={path}
          fill="rgba(6,182,212,0.2)"
          stroke="#06b6d4"
          strokeWidth="2"
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#06b6d4"
            className="shadow-[0_0_10px_#06b6d4]"
          />
        ))}
        {data.map((d, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = radius + 25;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              className="text-[10px] font-black fill-white/40 uppercase tracking-widest"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const GrowthLineChart = () => {
  const data = [20, 35, 45, 60, 75, 84];
  const width = 400;
  const height = 150;
  const padding = 20;
  
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * (width - padding * 2) + padding,
    y: height - (val / 100) * (height - padding * 2) - padding,
  }));

  const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");

  return (
    <div className="w-full h-[150px] relative">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          d={path}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d={`${path} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`}
          fill="url(#areaGradient)"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#06b6d4" />
        ))}
      </svg>
    </div>
  );
};

const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5,
          }}
          animate={{
            y: [null, "-100%"],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function CareerProgressPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skillData = [
    { label: "Frontend", value: 85 },
    { label: "Backend", value: 70 },
    { label: "AI/ML", value: 90 },
    { label: "DevOps", value: 60 },
    { label: "UI/UX", value: 75 },
    { label: "Soft Skills", value: 80 },
  ];

  const getAiSummary = () => {
    return "Your career growth is on a strong upward trend, especially in Neural Networks and Machine Learning. You've successfully mastered the core foundations and are now operating at a Level 4 competency. However, your System Design and Edge Deployment scores indicate a slight lag compared to top-tier peers. Your consistency in hackathon participation is your greatest multiplier. To accelerate further, focus on building end-to-end LLM applications and improving team leadership.";
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 relative overflow-hidden font-sans">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
        <Particles />
      </div>

      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
              <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-cyan-400" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">
              Terminal
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">
                Analytics Engine
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-12">
        <section className="space-y-4">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-4 py-1">
            System Analysis Established
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Career <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Progress.
            </span>
          </h1>
        </section>

        <section className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent border border-white/10 rounded-[40px] p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full group-hover:bg-cyan-500/10 transition-colors" />
          <div className="flex flex-col md:flex-row gap-10 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
              <Brain className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase italic text-cyan-400">AI Career Insights</h2>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">Calculated by Neural Core v4.2</p>
              </div>
              <p className="text-xl font-medium leading-relaxed text-white/90 max-w-4xl">
                {getAiSummary()}
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 space-y-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-3">
                  <Radar className="w-5 h-5 text-cyan-400" /> Skill Matrix
                </h3>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Multi-dimensional competence</p>
              </div>
            </div>
            <RadarChart data={skillData} />
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              This radar chart visualizes your current skill distribution across key domains. Your 
              <span className="text-cyan-400"> AI/ML</span> proficiency is currently your strongest vector.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 space-y-8">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-400" /> Growth Velocity
                  </h3>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">6-Month trajectory</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">84%</span>
                  <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">Total Progress</p>
                </div>
              </div>
              <GrowthLineChart />
              <p className="text-xs text-white/40 leading-relaxed font-medium">
                Your growth velocity has increased by <span className="text-purple-400">12.5%</span> this month. 
                The trend indicates you are on track to reach Level 5 within 45 days.
              </p>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                    <motion.circle
                      initial={{ strokeDashoffset: 219.9 }}
                      animate={{ strokeDashoffset: 219.9 * (1 - 0.84) }}
                      transition={{ duration: 2 }}
                      cx="40" cy="40" r="35" stroke="#a855f7" strokeWidth="8" fill="transparent"
                      strokeDasharray={219.9}
                      strokeLinecap="round"
                      className="drop-shadow-[0_0_10px_#a855f7]"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-black tracking-tighter">84</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-white uppercase tracking-tight">Career Readiness Score</h4>
                  <p className="text-xs text-white/40 font-medium">Based on 142 distinct neural data points including project quality and networking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-4">
              <Rocket className="w-8 h-8 text-cyan-400" /> Next Evolution <span className="text-white/20">Steps</span>
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Scale Implementation",
                desc: "Migrate your existing projects to a distributed microservices architecture.",
                icon: LayoutGrid,
                action: "Learn Docker & K8s",
                color: "cyan"
              },
              {
                title: "Advanced DSA Sync",
                desc: "Master graph algorithms and dynamic programming for competitive hacking.",
                icon: Code,
                action: "Practice on LeetCode",
                color: "purple"
              },
              {
                title: "Leadership Nexus",
                desc: "Take the lead in a team for the upcoming Global AI Hackathon.",
                icon: Users,
                action: "Join Team Finder",
                color: "emerald"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 space-y-6 hover:bg-white/[0.05] hover:border-white/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 ${
                  step.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/20' : 
                  step.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20' : 
                  'bg-emerald-500/10 border-emerald-500/20'
                }`}>
                  <step.icon className={`w-6 h-6 ${
                    step.color === 'cyan' ? 'text-cyan-400' : 
                    step.color === 'purple' ? 'text-purple-400' : 
                    'text-emerald-400'
                  }`} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors">{step.title}</h4>
                  <p className="text-sm text-white/40 font-medium leading-relaxed">{step.desc}</p>
                </div>
                <Button variant="ghost" className="w-full h-12 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest">
                  {step.action} <ArrowUpRight className="ml-2 w-3 h-3" />
                </Button>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-24 text-center border-t border-white/5">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-[1em]">
          CampusConnect Analytics Engine // Analysis Stable
        </p>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
}
