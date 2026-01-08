"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Mic,
  Briefcase,
  MapPin,
  Bell,
  Search,
  TrendingUp,
  BarChart3,
  Settings,
  Home,
  Menu,
  X,
  Sparkles,
  Trophy,
  Rocket,
  ArrowRight,
  Activity,
  ChevronRight,
  Command,
  Plus,
  LogOut,
  User,
  Shield,
  CreditCard,
  Target,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useMemo } from "react";
import ThreeDBackground from "@/components/ThreeDBackground";
import TiltCard from "@/components/TiltCard";
import { toast } from "sonner";

const navItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard", active: true },
  { icon: Mic, label: "Silent Scream", href: "/silent-scream", badge: "3" },
  {
    icon: Briefcase,
    label: "Internship Feed",
    href: "/internship-feed",
    badge: "Hot",
  },
  { icon: MapPin, label: "AI Roadmap", href: "/ai-roadmap" },
  { icon: Trophy, label: "Hackathons", href: "/hackathons" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const stats = [
  {
    label: "Active Reports",
    value: "3",
    icon: Activity,
    color: "rose",
    desc: "+1 today",
    progress: 75,
    href: "/silent-scream",
    rgb: "244, 63, 94",
  },
  {
    label: "Career Progress",
    value: "84%",
    icon: TrendingUp,
    color: "cyan",
    desc: "Level 4 reached",
    isCircular: true,
    href: "/ai-roadmap",
    rgb: "6, 182, 212",
  },
  {
    label: "Hackathons Joined",
    value: "12",
    icon: Trophy,
    color: "violet",
    desc: "3 upcoming",
    hasSpark: true,
    href: "/hackathons",
    rgb: "139, 92, 246",
  },
];

const features = [
  {
    id: "silent-scream",
    title: "Silent Scream",
    desc: "Report issues anonymously with AI transcription. Your voice matters, safely.",
    icon: Mic,
    color: "rose",
    href: "/silent-scream",
    tag: "SAFETY FIRST",
    accent: "#f43f5e",
  },
  {
    id: "ai-roadmap",
    title: "AI Career Roadmap",
    desc: "Get your personalized career path in minutes. AI-driven success path.",
    icon: Brain,
    color: "cyan",
    href: "/ai-roadmap",
    tag: "AI POWERED",
    accent: "#06b6d4",
  },
  {
    id: "crack-hack",
    title: "CrackHack – Hackathon Hub",
    desc: "Discover and track ongoing & upcoming hackathons. Join teams or create one.",
    icon: Rocket,
    color: "violet",
    href: "/hackathons",
    tag: "OPPORTUNITY",
    accent: "#8b5cf6",
  },
  {
    id: "internship-feed",
    title: "Internship Feed",
    desc: "Real-time updates on latest tech internships and student experiences.",
    icon: Briefcase,
    color: "emerald",
    href: "/internship-feed",
    tag: "CAREERS",
    accent: "#10b981",
  },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAction = (label: string) => {
    toast.info(`${label} action triggered!`);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-cyan-500/30">
      <ThreeDBackground />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-black/40 backdrop-blur-[40px] border-r border-white/[0.05] transform transition-all duration-700 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-purple-500 p-[1px] group-hover:rotate-[10deg] transition-transform duration-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <div className="w-full h-full rounded-[15px] bg-[#050508] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
            </div>
            <div>
              <span className="text-md font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                CampusConnect
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <p className="px-4 py-2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            Main Menu
          </p>
          {navItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div
                whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${item.active ? "bg-white/[0.08] text-white shadow-[0_0_25px_rgba(6,182,212,0.15)] border border-white/[0.1]" : "text-white/40 hover:text-white/80"}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon
                    className={`w-[20px] h-[20px] ${item.active ? "text-cyan-400" : "group-hover:text-cyan-400"} transition-colors`}
                  />
                  <span className="font-bold text-[14px] tracking-wide">
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-lg font-black tracking-tighter ${item.badge === "Hot" ? "bg-rose-500/20 text-rose-400" : "bg-cyan-500/20 text-cyan-400"} border border-current/10`}
                  >
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[280px] relative min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 px-8 py-6 bg-black/10 backdrop-blur-[30px] border-b border-white/[0.03]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3 hover:bg-white/5 rounded-2xl transition-colors"
              >
                <Menu className="w-6 h-6 text-white/60" />
              </button>
              <div className="relative group hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                <Input
                  placeholder="Ask AI anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[300px] lg:w-[400px] h-12 pl-12 bg-white/[0.03] border-white/[0.06] rounded-2xl text-sm focus:border-cyan-500/30 focus:bg-white/[0.05] transition-all placeholder:text-white/20 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-2xl relative hover:bg-white/5 border border-white/[0.05]"
              >
                <Bell className="w-5 h-5 text-white/60" />
                <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-cyan-500 rounded-full" />
              </Button>

              <div className="h-8 w-[1px] bg-white/[0.08] mx-2" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-4 pl-2 group outline-none">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 p-[1px]">
                      <div className="w-full h-full rounded-[11px] bg-[#050508] flex items-center justify-center overflow-hidden">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-black/90 backdrop-blur-xl border-white/10 rounded-2xl p-2 text-white"
                >
                  <DropdownMenuItem
                    className="rounded-xl focus:bg-white/5 focus:text-cyan-400 cursor-pointer p-3"
                    onClick={() => handleAction("Profile")}
                  >
                    <User className="w-4 h-4 mr-3" />{" "}
                    <span className="text-sm font-bold">Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5 my-2" />
                  <DropdownMenuItem
                    className="rounded-xl focus:bg-rose-500/20 focus:text-rose-400 cursor-pointer p-3"
                    onClick={() => handleAction("Logout")}
                  >
                    <LogOut className="w-4 h-4 mr-3" />{" "}
                    <span className="text-sm font-bold">Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-8 lg:p-12 max-w-7xl mx-auto space-y-20">
          {/* Hero Section */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">
                  Neural Interface Active
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
                Welcome, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500">
                  Campus Leader
                </span>
              </h1>

              <p className="text-white/50 text-lg max-w-2xl leading-relaxed font-medium">
                Your AI-powered ecosystem for campus safety, career growth, and
                academic excellence.
              </p>
            </motion.div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <TiltCard key={i} className="h-48 group">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="w-full h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 flex flex-col justify-between hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    {stat.isCircular && (
                      <div className="relative w-12 h-12">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-white/5"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={125.6}
                            strokeDashoffset={125.6 * (1 - 0.84)}
                            className={`text-${stat.color}-400`}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">
                          84%
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white">
                      {stat.value}
                    </h3>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </section>

          {/* Features */}
          <section className="space-y-10">
            <h2 className="text-3xl font-black tracking-tight">
              Neuro-Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <Link key={i} href={feature.href}>
                  <TiltCard className="h-full">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                      className="group h-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 flex flex-col hover:bg-white/[0.06] transition-all cursor-pointer"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
                        style={{ backgroundColor: `${feature.accent}22` }}
                      >
                        <feature.icon
                          className="w-7 h-7"
                          style={{ color: feature.accent }}
                        />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-white/40 text-sm line-clamp-3 mb-6">
                        {feature.desc}
                      </p>
                      <div className="mt-auto flex items-center text-[10px] font-black text-cyan-400 uppercase tracking-widest group-hover:gap-2 transition-all">
                        Access System <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.div>
                  </TiltCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Activity */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-[32px] p-8"
            >
              <h3 className="text-2xl font-black mb-8">System Activity</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Neuro-Report Synced",
                    time: "12m ago",
                    color: "rose",
                    icon: Shield,
                  },
                  {
                    title: "Career Path Updated",
                    time: "4h ago",
                    color: "cyan",
                    icon: Target,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}
                    >
                      <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-white/[0.1] rounded-[32px] p-8 flex flex-col justify-between"
            >
              <div>
                <Brain className="w-10 h-10 text-cyan-400 mb-6" />
                <h3 className="text-4xl font-black mb-4 leading-tight">
                  Evolve your <br /> destiny.
                </h3>
                <p className="text-white/60 text-sm font-medium">
                  14 new opportunities match your profile.
                </p>
              </div>
              <Button className="mt-8 h-14 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest text-xs">
                Analyze Matches
              </Button>
            </motion.div>
          </section>
        </main>

        <footer className="p-12 border-t border-white/[0.03] mt-20 text-center text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          System v4.0.2 • Neural Link Verified
        </footer>
      </div>
    </div>
  );
}
