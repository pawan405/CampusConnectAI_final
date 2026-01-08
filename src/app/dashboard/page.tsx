"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Mic,
  Briefcase,
  TrendingUp,
  Bell,
  Search,
  Trophy,
  Rocket,
  ArrowRight,
  Activity,
  LogOut,
  User,
  Shield,
  Target,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import ThreeDBackground from "@/components/ThreeDBackground";
import TiltCard from "@/components/TiltCard";
import { toast } from "sonner";

const navItems = [
  { icon: Activity, label: "System Core", href: "/dashboard", active: true },
  { icon: Mic, label: "Silent Scream", href: "/silent-scream", badge: "Live" },
  { icon: Briefcase, label: "Internship Feed", href: "/internship-feed", badge: "Hot" },
  { icon: Brain, label: "AI Roadmap", href: "/ai-roadmap" },
  { icon: Trophy, label: "CrackHack", href: "/hackathons" },
];

const stats = [
  {
    label: "Active Reports",
    value: "03",
    icon: Shield,
    color: "cyan",
    desc: "+1 sync today",
    progress: 75,
    rgb: "6, 182, 212",
  },
  {
    label: "Career Progress",
    value: "84%",
    icon: TrendingUp,
    color: "purple",
    desc: "Level 4 reached",
    isCircular: true,
    rgb: "168, 85, 247",
  },
  {
    label: "Hackathons Joined",
    value: "12",
    icon: Trophy,
    color: "blue",
    desc: "3 upcoming events",
    rgb: "59, 130, 246",
  },
];

const features = [
  {
    title: "Silent Scream",
    desc: "Report issues anonymously with AI transcription. Your voice matters, safely.",
    icon: Mic,
    color: "cyan",
    href: "/silent-scream",
    accent: "#06b6d4",
  },
  {
    title: "AI Career Roadmap",
    desc: "Get your personalized career path in minutes. AI-driven success path.",
    icon: Brain,
    color: "purple",
    href: "/ai-roadmap",
    accent: "#a855f7",
  },
  {
    title: "CrackHack – Hub",
    desc: "Discover and track ongoing & upcoming hackathons. Join teams or create one.",
    icon: Rocket,
    color: "blue",
    href: "/hackathons",
    accent: "#3b82f6",
  },
  {
    title: "Internship Feed",
    desc: "Real-time updates on latest tech internships and student experiences.",
    icon: Briefcase,
    color: "emerald",
    href: "/internship-feed",
    accent: "#10b981",
  },
];

const activities = [
  { title: "Neuro-Report Synced", time: "12m ago", icon: Shield, color: "cyan" },
  { title: "Career Path Updated", time: "4h ago", icon: Target, color: "purple" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      <ThreeDBackground />

      {/* Sidebar - Glassmorphism */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-black/40 backdrop-blur-2xl border-r border-white/10 transform transition-all duration-500 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 p-[1px] group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center">
                <Brain className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              CampusConnect
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-white/40">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-4 mt-8 space-y-2">
          {navItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div
                whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${item.active ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10" : "text-white/40 hover:text-white"}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`w-5 h-5 ${item.active ? "text-cyan-400" : ""}`} />
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 font-black">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[280px] min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 px-8 py-6 bg-black/20 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors">
                <Menu className="w-6 h-6 text-white/60" />
              </button>
              <div className="relative group hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  placeholder="System Search..."
                  className="w-[300px] h-11 pl-12 bg-white/5 border-white/10 rounded-2xl text-sm focus:border-cyan-500/30 transition-all placeholder:text-white/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="w-11 h-11 rounded-2xl border border-white/5 hover:bg-white/5 relative">
                <Bell className="w-5 h-5 text-white/60" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
              </Button>
              <div className="h-6 w-px bg-white/10 mx-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 p-1 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                    <div className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-500">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sentinel" alt="avatar" />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-xl border-white/10 rounded-2xl p-2">
                  <DropdownMenuItem className="rounded-xl focus:bg-white/5 focus:text-cyan-400 cursor-pointer p-3">
                    <User className="w-4 h-4 mr-3" /> <span className="text-sm font-bold text-white">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="rounded-xl focus:bg-rose-500/20 focus:text-rose-400 cursor-pointer p-3">
                    <LogOut className="w-4 h-4 mr-3" /> <span className="text-sm font-bold">Disconnect</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-8 lg:p-12 max-w-7xl mx-auto space-y-20">
          {/* Hero Section */}
          <section className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">
                  System Online // Verified
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4">
                Evolve your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500 animate-gradient-x">
                  destiny.
                </span>
              </h1>
              <p className="text-white/40 text-lg lg:text-xl max-w-2xl font-medium leading-relaxed">
                AI-powered insights designed for the next generation of innovators. 
                Navigate your campus ecosystem with neuro-precision.
              </p>
              <Button className="h-14 px-8 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_#06b6d4] group">
                Analyze Matches <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="h-44">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  className="w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 flex flex-col justify-between group hover:border-white/20 transition-all hover:bg-white/[0.08]"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                      <stat.icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" style={{ color: stat.rgb && `rgb(${stat.rgb})` }} />
                    </div>
                    {stat.isCircular && (
                      <div className="relative w-12 h-12 group-hover:rotate-12 transition-transform">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="4" fill="transparent" />
                          <circle
                            cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent"
                            strokeDasharray={125.6} strokeDashoffset={125.6 * (1 - 0.84)}
                            className="text-purple-500 drop-shadow-[0_0_8px_#a855f7]"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">84</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black tracking-tighter text-white/90">{stat.value}</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </section>

          {/* Feature Modules */}
          <section className="space-y-12">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tighter">System Modules</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Link key={i} href={feature.href}>
                  <TiltCard className="h-full">
                    <motion.div
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      className="group h-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 flex flex-col hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-5 group-hover:opacity-20 transition-opacity" style={{ from: feature.accent }} />
                      <div
                        className="w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 border border-white/10 bg-white/5"
                        style={{ boxShadow: `0 10px 30px -10px ${feature.accent}44` }}
                      >
                        <feature.icon className="w-8 h-8 group-hover:scale-110 transition-all duration-500" style={{ color: feature.accent }} />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                        {feature.desc}
                      </p>
                      <div className="mt-auto flex items-center text-[10px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-cyan-400 transition-colors">
                        Access System <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Activity & AI Core */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 flex flex-col group"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-2xl font-black tracking-tight">System Activity</h3>
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              </div>
              <div className="space-y-6">
                {activities.map((item, i) => (
                  <div key={i} className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/item">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/10">
                      <item.icon className="w-5 h-5 text-white/60 group-hover/item:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white/80 group-hover/item:text-white transition-colors">{item.title}</p>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-black">{item.time}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/10 group-hover/item:text-white/40 transition-all" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-3xl border border-white/20 rounded-[40px] p-10 flex flex-col justify-between group hover:border-white/40 transition-all"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:rotate-12 transition-transform">
                  <Brain className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-4xl font-black mb-4 tracking-tighter leading-[1.1]">
                  AI Core <br />
                  Analysis Ready.
                </h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed max-w-[240px]">
                  14 new opportunities synchronized with your career vector.
                </p>
              </div>
              <Button className="mt-10 h-14 w-full rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-all">
                Access Intelligence
              </Button>
            </motion.div>
          </section>
        </main>

        <footer className="py-16 text-center">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.8em]">
            CampusConnect AI // Neural Link Established // v4.0.2
          </p>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
