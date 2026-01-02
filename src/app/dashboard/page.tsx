"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Brain,
  Mic,
  Briefcase,
  MapPin,
  Bell,
  Search,
  TrendingUp,
  Users,
  FileText,
  Clock,
  ArrowRight,
  ChevronRight,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  Home,
  Menu,
  X,
  Sparkles,
  Zap,
  Target,
  Shield,
  Star,
  ArrowUpRight,
  Calendar,
  Flame,
  Command,
  Radio,
  Play,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const recentReports = [
  {
    id: 1,
    status: "In Review",
    date: "2 hours ago",
    type: "Safety Concern",
    priority: "High",
  },
  {
    id: 2,
    status: "Resolved",
    date: "1 day ago",
    type: "Harassment",
    priority: "Critical",
  },
  {
    id: 3,
    status: "Pending",
    date: "3 days ago",
    type: "Infrastructure",
    priority: "Medium",
  },
];

const trendingPosts = [
  {
    company: "Google",
    role: "SDE Intern",
    skills: ["DSA", "System Design"],
    likes: 124,
    views: "2.4k",
  },
  {
    company: "Microsoft",
    role: "PM Intern",
    skills: ["Product Sense", "SQL"],
    likes: 89,
    views: "1.8k",
  },
  {
    company: "Amazon",
    role: "Data Analyst",
    skills: ["Python", "Excel"],
    likes: 67,
    views: "1.2k",
  },
];

const quickStats = [
  {
    label: "Active Reports",
    value: "3",
    change: "+1 today",
    icon: FileText,
    color: "from-rose-500 to-pink-600",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  {
    label: "Posts Read",
    value: "47",
    change: "+12 this week",
    icon: TrendingUp,
    color: "from-cyan-500 to-blue-600",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    label: "Roadmaps",
    value: "2",
    change: "Generate new",
    icon: MapPin,
    color: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    label: "Community",
    value: "5.2K",
    change: "+234 members",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];

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
  { icon: BarChart3, label: "Analytics", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#08080c] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-900/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0c0c12]/90 backdrop-blur-2xl border-r border-white/[0.06] transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        <div className="p-6 pb-4">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-emerald-400 via-cyan-500 to-violet-500 p-[1px]">
                <div className="w-full h-full rounded-[13px] bg-[#0c0c12] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-[2px] border-[#0c0c12]" />
            </div>
            <div>
              <span className="text-[15px] font-semibold text-white/90">
                CampusConnect
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[10px] text-white/30 font-medium tracking-wide">
                  AI PLATFORM
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Search in sidebar */}
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input
              placeholder="Search..."
              className="w-full h-10 pl-9 pr-3 bg-white/[0.03] border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
            />
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          <p className="px-3 py-2 text-[10px] font-medium text-white/25 uppercase tracking-wider">
            Menu
          </p>
          {navItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <motion.div
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  item.active
                    ? "bg-white/[0.08] text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    variants={{
                      hover: { scale: 1.1, rotate: 5 },
                      initial: { scale: 1, rotate: 0 },
                    }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      item.active
                        ? "bg-emerald-500/20"
                        : "bg-white/[0.03] group-hover:bg-white/[0.06]"
                    }`}
                  >
                    <item.icon
                      className={`w-[18px] h-[18px] ${
                        item.active ? "text-emerald-400" : ""
                      }`}
                    />
                  </motion.div>
                  <span className="font-medium text-[13px]">{item.label}</span>
                </div>
                {item.badge && (
                  <motion.span
                    variants={{
                      hover: { scale: 1.1, x: -2 },
                      initial: { scale: 1, x: 0 },
                    }}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.badge === "Hot"
                        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20"
                        : "bg-emerald-500/15 text-emerald-400"
                    }`}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[13px] text-white/80 truncate">
                John Doe
              </p>
              <p className="text-[11px] text-white/30 truncate">
                CSE • 3rd Year
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-[280px] relative">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#08080c]/70 backdrop-blur-2xl border-b border-white/[0.04]">
          <div className="flex items-center justify-between px-6 py-3.5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors"
              >
                <Menu className="w-[18px] h-[18px] text-white/60" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <Input
                  placeholder="Search anything..."
                  className="w-72 h-10 pl-10 bg-white/[0.03] border-white/[0.06] rounded-xl text-sm text-white placeholder:text-white/25 focus:border-emerald-500/40 transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/30">
                  <Command className="w-3 h-3" />K
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-colors relative">
                <Bell className="w-[18px] h-[18px] text-white/50" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
              </button>
              <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-white/[0.06]">
                <div className="text-right">
                  <p className="text-[13px] font-medium text-white/80">
                    John Doe
                  </p>
                  <p className="text-[11px] text-white/40">CSE • 3rd Year</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm ring-2 ring-violet-500/20">
                  JD
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          {/* Welcome section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-[12px] font-medium text-emerald-400">
                      5 day streak
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    <Calendar className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-[12px] text-white/40">
                      Dec 23, 2024
                    </span>
                  </div>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                  <span className="text-white/90">Welcome back, </span>
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                    John!
                  </span>
                  <span className="inline-block ml-2">👋</span>
                </h1>
                <p className="text-white/40 text-[15px]">
                  Here&apos;s what&apos;s happening on your campus today
                </p>
              </div>
              <div className="flex gap-2.5">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="h-10 px-4 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[13px] font-medium text-white/60 hover:text-white/80 flex items-center gap-2 transition-all shadow-sm"
                >
                  <Target className="w-4 h-4" />
                  Set Goals
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-10 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-[13px] font-semibold text-white flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Quick Action
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-emerald-500/5">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center transition-transform duration-300`}
                      >
                        <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                      </motion.div>
                      <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-2xl font-bold text-white/90 mb-0.5">
                      {stat.value}
                    </p>
                    <p className="text-[13px] text-white/40 mb-2">
                      {stat.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-emerald-400/80 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                      <div className="w-12 h-1 bg-white/[0.03] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature cards - Modern pill style icons */}
          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: Mic,
                title: "Silent Scream",
                desc: "Report issues anonymously with AI transcription",
                color: "from-rose-500 to-pink-500",
                iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
                href: "/silent-scream",
                tag: "SAFETY FIRST",
              },
              {
                icon: Briefcase,
                title: "Internship Feed",
                desc: "Real experiences from seniors who made it",
                color: "from-violet-500 to-indigo-500",
                iconBg: "bg-gradient-to-br from-violet-500 to-indigo-600",
                href: "/internship-feed",
                tag: "TRENDING",
              },
              {
                icon: MapPin,
                title: "AI Roadmap",
                desc: "Get your personalized career path in minutes",
                color: "from-emerald-500 to-cyan-500",
                iconBg: "bg-gradient-to-br from-emerald-400 to-cyan-500",
                href: "/ai-roadmap",
                tag: "AI POWERED",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group h-full"
              >
                <Link href={item.href}>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] group-hover:border-white/[0.12] group-hover:bg-white/[0.04] transition-all duration-500 cursor-pointer relative overflow-hidden h-full shadow-2xl group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                    {/* Glow effect */}
                    <div
                      className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${item.color} opacity-[0.08] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:opacity-[0.15] group-hover:scale-110 transition-all duration-700`}
                    />

                    <div className="relative">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white/[0.06] text-[10px] font-semibold text-white/50 tracking-wider mb-5 transition-colors group-hover:text-white/70 group-hover:bg-white/[0.1]">
                        {item.tag}
                      </span>

                      {/* Modern icon style */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-5 shadow-xl group-hover:shadow-current transition-all duration-300`}
                      >
                        <item.icon
                          className="w-7 h-7 text-white"
                          strokeWidth={1.5}
                        />
                      </motion.div>

                      <h3 className="text-lg font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-white/35 leading-relaxed group-hover:text-white/50 transition-colors">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-1.5 mt-6 text-[12px] font-medium text-white/30 group-hover:text-emerald-400 transition-all">
                        <span className="group-hover:mr-1">Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom cards */}
          <div className="grid lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center">
                      <Shield className="w-[18px] h-[18px] text-rose-400" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white/80">
                      Your Reports
                    </h3>
                  </div>
                  <Link href="/silent-scream">
                    <button className="text-[12px] font-medium text-emerald-400/80 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
                <div className="space-y-2.5">
                  {recentReports.map((report, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-transparent hover:border-white/[0.06] hover:bg-white/[0.04] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                            report.priority === "Critical"
                              ? "bg-rose-500/15"
                              : report.priority === "High"
                              ? "bg-amber-500/15"
                              : "bg-white/[0.06]"
                          }`}
                        >
                          <Activity
                            className={`w-[18px] h-[18px] ${
                              report.priority === "Critical"
                                ? "text-rose-400"
                                : report.priority === "High"
                                ? "text-amber-400"
                                : "text-white/40"
                            }`}
                          />
                        </motion.div>
                        <div>
                          <p className="text-[13px] font-medium text-white/70 group-hover:text-white transition-colors">
                            {report.type}
                          </p>
                          <p className="text-[11px] text-white/30 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {report.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-[10px] font-medium px-2 py-1 rounded-md transition-all ${
                            report.status === "Resolved"
                              ? "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                              : report.status === "In Review"
                              ? "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20"
                              : "bg-white/[0.04] text-white/40"
                          }`}
                        >
                          {report.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <TrendingUp className="w-[18px] h-[18px] text-cyan-400" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white/80">
                      Trending Stories
                    </h3>
                  </div>
                  <Link href="/internship-feed">
                    <button className="text-[12px] font-medium text-emerald-400/80 hover:text-emerald-400 flex items-center gap-1 transition-colors">
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
                <div className="space-y-2.5">
                  {trendingPosts.map((post, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-white/80 font-semibold text-[13px]">
                            {post.company.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-white/70">
                              {post.company}
                            </p>
                            <p className="text-[11px] text-white/30">
                              {post.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 text-[11px] text-white/30">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />{" "}
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {post.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {post.skills.map((skill, j) => (
                          <span
                            key={j}
                            className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/[0.04] text-white/40"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile close button */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed top-4 right-4 z-50 lg:hidden w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-[18px] h-[18px] text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
