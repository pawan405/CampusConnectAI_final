import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  ArrowLeft,
  Sparkles,
  Target,
  BookOpen,
  Code,
  Briefcase,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  ShieldCheck,
  AlertTriangle,
  LayoutGrid,
  Star,
  MapPin,
  Wand2,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Zap,
  Activity,
  AlertCircle,
  BarChart3,
  Radar,
  LineChart as LineChartIcon,
  CircleDot,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

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

  const path =
    points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ") + " Z";

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grids */}
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
        {/* Axes */}
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
        {/* Data Path */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          d={path}
          fill="rgba(6,182,212,0.2)"
          stroke="#06b6d4"
          strokeWidth="2"
        />
        {/* Points */}
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
        {/* Labels */}
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

  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <div className="w-full h-[150px] relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
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

// Particles Component for the cinematic vibe

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

export default function AICareerRoadmap() {
  const [mounted, setMounted] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "roadmap">("roadmap");
  const [discipline, setDiscipline] = useState("cse");
  const [intent, setIntent] = useState("ai");

  const skillData = [
    { label: "Frontend", value: 85 },
    { label: "Backend", value: 70 },
    { label: "AI/ML", value: 90 },
    { label: "DevOps", value: 60 },
    { label: "UI/UX", value: 75 },
    { label: "Soft Skills", value: 80 },
  ];

  const getAiSummary = () => {
    const base = `Your career growth is on a strong upward trend, especially in ${intent === "ai" ? "Neural Networks and Machine Learning" : intent === "web" ? "Modern Web Architecture" : "Data Science"}. `;
    const progress =
      "You've successfully mastered the core foundations and are now operating at a Level 4 competency. ";
    const lag = `However, your ${discipline === "cse" ? "System Design" : "Hardware Integration"} and Edge Deployment scores indicate a slight lag compared to top-tier peers. `;
    const positive =
      "Your consistency in hackathon participation is your greatest multiplier. ";
    const suggestion = `To accelerate further, focus on building ${intent === "ai" ? "end-to-end LLM applications" : "high-scale distributed systems"} and improving team leadership.`;

    return base + progress + lag + positive + suggestion;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerate = () => {
    setLoading(true);
    toast.loading("Analyzing neural patterns...", { duration: 1500 });
    setTimeout(() => {
      setIsGenerated(true);
      setLoading(false);
      toast.success("Neural Roadmap Generated", {
        description: "Your path to excellence has been calculated.",
      });
    }, 1500);
  };

  const handleAction = (action: string) => {
    toast.info(`Initializing: ${action}`, {
      description: "Redirecting to specialized training module...",
    });
  };

  const handleResolveConflict = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Recalibrating skill vectors...",
      success: "Conflict resolved. Neural paths normalized.",
      error: "Recalibration failed. Please retry.",
    });
  };

  if (!mounted) return null;

  const roadmapSteps = [
    {
      month: "Month 1",
      title: "Foundations & Logic",
      description:
        "Mastering core algorithms and data structures. Building the logic bridge.",
      skills: ["Data Structures", "Algorithms", "Clean Code"],
      projects: ["Logic Engine", "Base Module"],
      color: "cyan",
    },
    {
      month: "Month 2",
      title: "Core Architecture",
      description: "Deep dive into system design and framework integration.",
      skills: ["System Design", "Advanced React", "Next.js"],
      projects: ["Neural Dashboard", "Flow System"],
      color: "purple",
    },
    {
      month: "Month 3",
      title: "Deployment & Scale",
      description:
        "Learning cloud infrastructure and high-performance scaling.",
      skills: ["AWS/Vercel", "Docker", "Edge Functions"],
      projects: ["Global Core", "Scale Shield"],
      color: "emerald",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500/30 relative overflow-hidden font-sans">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
        <Particles />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group">
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
                Neural Core v4.0
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Tabs Section */}
        <div className="flex items-center gap-4 mb-12 bg-white/5 p-2 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === "overview"
                ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "text-white/40 hover:text-white"
            }`}
          >
            Progress Overview
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              activeTab === "roadmap"
                ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                : "text-white/40 hover:text-white"
            }`}
          >
            Neural Roadmap
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* AI Summary Section */}
              <section className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent border border-white/10 rounded-[40px] p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] rounded-full group-hover:bg-cyan-500/10 transition-colors" />
                <div className="flex flex-col md:flex-row gap-10 relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                    <Brain className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-black tracking-tighter uppercase italic text-cyan-400">
                        AI Career Insights
                      </h2>
                      <p className="text-white/40 text-xs font-black uppercase tracking-widest">
                        Calculated by Neural Core v4.2
                      </p>
                    </div>
                    <p className="text-xl font-medium leading-relaxed text-white/90 max-w-4xl">
                      {getAiSummary()}
                    </p>
                  </div>
                </div>
              </section>

              {/* Visualizations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Skill Radar */}
                <div
                  onClick={() =>
                    toast.info("Neural Skill Matrix", {
                      description:
                        "Viewing real-time distribution of your engineering competencies.",
                    })
                  }
                  className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 space-y-8 cursor-pointer group hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-3">
                        <Radar className="w-5 h-5 text-cyan-400" /> Skill Matrix
                      </h3>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                        Multi-dimensional competence
                      </p>
                    </div>
                  </div>
                  <RadarChart data={skillData} />
                  <p className="text-xs text-white/40 leading-relaxed font-medium">
                    This radar chart visualizes your current skill distribution
                    across key domains. Your
                    <span className="text-cyan-400"> AI/ML</span> proficiency is
                    currently your strongest vector.
                  </p>
                </div>

                {/* Growth & Overall Progress */}
                <div className="space-y-8">
                  <div
                    onClick={() =>
                      toast.info("Growth Velocity", {
                        description:
                          "Analyzing your learning trajectory over the last 6 cycles.",
                      })
                    }
                    className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 space-y-8 cursor-pointer group hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-3">
                          <TrendingUp className="w-5 h-5 text-purple-400" />{" "}
                          Growth Velocity
                        </h3>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                          6-Month trajectory
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-white">
                          84%
                        </span>
                        <p className="text-[9px] font-black text-purple-400 uppercase tracking-widest">
                          Total Progress
                        </p>
                      </div>
                    </div>
                    <GrowthLineChart />
                    <p className="text-xs text-white/40 leading-relaxed font-medium">
                      Your growth velocity has increased by{" "}
                      <span className="text-purple-400">12.5%</span> this month.
                      The trend indicates you are on track to reach Level 5
                      within 45 days.
                    </p>
                  </div>

                  <div
                    onClick={() =>
                      toast.info("Career Readiness", {
                        description:
                          "Your readiness score is calculated from 142 distinct neural data points.",
                      })
                    }
                    className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 cursor-pointer group hover:bg-white/[0.05] transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative w-20 h-20 shrink-0">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="8"
                            fill="transparent"
                          />
                          <motion.circle
                            initial={{ strokeDashoffset: 219.9 }}
                            animate={{ strokeDashoffset: 219.9 * (1 - 0.84) }}
                            transition={{ duration: 2 }}
                            cx="40"
                            cy="40"
                            r="35"
                            stroke="#a855f7"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={219.9}
                            strokeLinecap="round"
                            className="drop-shadow-[0_0_10px_#a855f7]"
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-lg font-black tracking-tighter">
                          84
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-white uppercase tracking-tight">
                          Career Readiness Score
                        </h4>
                        <p className="text-xs text-white/40 font-medium">
                          Based on 142 distinct neural data points including
                          project quality and networking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Growth Suggestions */}
              <section className="space-y-8">
                <div className="flex items-center gap-6">
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-4">
                    <Rocket className="w-8 h-8 text-cyan-400" /> Next Evolution{" "}
                    <span className="text-white/20">Steps</span>
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
                      color: "cyan",
                    },
                    {
                      title: "Advanced DSA Sync",
                      desc: "Master graph algorithms and dynamic programming for competitive hacking.",
                      icon: Code,
                      action: "Practice on LeetCode",
                      color: "purple",
                    },
                    {
                      title: "Leadership Nexus",
                      desc: "Take the lead in a team for the upcoming Global AI Hackathon.",
                      icon: Users,
                      action: "Join Team Finder",
                      color: "emerald",
                    },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 space-y-6 hover:bg-white/[0.05] hover:border-white/20 transition-all group"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 ${
                          step.color === "cyan"
                            ? "bg-cyan-500/10 border-cyan-500/20"
                            : step.color === "purple"
                              ? "bg-purple-500/10 border-purple-500/20"
                              : "bg-emerald-500/10 border-emerald-500/20"
                        }`}
                      >
                        <step.icon
                          className={`w-6 h-6 ${
                            step.color === "cyan"
                              ? "text-cyan-400"
                              : step.color === "purple"
                                ? "text-purple-400"
                                : "text-emerald-400"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-black text-lg text-white group-hover:text-cyan-400 transition-colors">
                          {step.title}
                        </h4>
                        <p className="text-sm text-white/40 font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleAction(step.action)}
                        variant="ghost"
                        className="w-full h-12 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest"
                      >
                        {step.action} <ArrowUpRight className="ml-2 w-3 h-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="roadmap-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Header Section */}
              <div className="mb-20 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Autonomous Pathfinding
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl lg:text-7xl font-black tracking-tighter"
                >
                  AI Career <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500">
                    Roadmap.
                  </span>
                </motion.h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* LEFT: Form Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-4"
                >
                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tight flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <Target className="w-4 h-4 text-cyan-400" />
                          </div>
                          Parameters
                        </h3>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">
                          Configure your neural profile to generate a precision
                          roadmap.
                        </p>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                            Target Year
                          </Label>
                          <Select>
                            <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all">
                              <SelectValue placeholder="Current Stage" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-white/10 text-black">
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="1"
                              >
                                1st Year
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="2"
                              >
                                2nd Year
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="3"
                              >
                                3rd Year
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="4"
                              >
                                4th Year
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                            Discipline
                          </Label>
                          <Select onValueChange={setDiscipline}>
                            <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all">
                              <SelectValue placeholder="Branch" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-white/10 text-black">
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="cse"
                              >
                                CS Engineering
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="ece"
                              >
                                Electronics
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="me"
                              >
                                Mechanical
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-black text-white/20 uppercase tracking-widest pl-1">
                            Neural Intent
                          </Label>
                          <Select onValueChange={setIntent}>
                            <SelectTrigger className="h-14 bg-white/[0.02] border-white/5 rounded-2xl focus:ring-cyan-500/20 hover:bg-white/[0.04] transition-all">
                              <SelectValue placeholder="Interests" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-white/10 text-black">
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="web"
                              >
                                Fullstack Web
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="ai"
                              >
                                AI / ML Engineer
                              </SelectItem>
                              <SelectItem
                                className="text-black focus:bg-gray-100 focus:text-black"
                                value="data"
                              >
                                Data Scientist
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          onClick={handleGenerate}
                          disabled={loading}
                          className="w-full h-16 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs tracking-[0.3em] uppercase transition-all shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:shadow-cyan-400/50 group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          {loading ? (
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                              Analyzing...
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Zap className="w-4 h-4 fill-current" />
                              Initiate Sequence
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT: Roadmap Output */}
                <div className="lg:col-span-8 relative">
                  <AnimatePresence mode="wait">
                    {!isGenerated && !loading ? (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full min-h-[500px] flex flex-col items-center justify-center text-center space-y-6 border-2 border-dashed border-white/5 rounded-[40px] bg-white/[0.01]"
                      >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                          <Brain className="w-10 h-10 text-white/20" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-xl font-bold text-white/40 tracking-tight">
                            System Idle
                          </p>
                          <p className="text-sm text-white/20">
                            Waiting for parameter sync...
                          </p>
                        </div>
                      </motion.div>
                    ) : isGenerated ? (
                      <motion.div
                        key="roadmap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                      >
                        {/* Timeline Header */}
                        <div className="flex items-center justify-between px-4">
                          <h3 className="text-2xl font-black tracking-tight flex items-center gap-4">
                            <MapPin className="w-6 h-6 text-cyan-400" />
                            Active Trajectory
                          </h3>
                          <div className="flex items-center gap-4">
                            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-1.5 text-[9px] font-black tracking-widest uppercase">
                              3 Stages Locked
                            </Badge>
                          </div>
                        </div>

                        {/* Vertical Roadmap */}
                        <div className="relative pl-12 space-y-12">
                          <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                          {roadmapSteps.map((step, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.2 }}
                              className="relative"
                            >
                              <div className="absolute -left-[54px] top-0 w-11 h-11 flex items-center justify-center">
                                <div
                                  className={`w-4 h-4 rounded-full bg-[#050508] border-2 z-10 relative ${
                                    step.color === "cyan"
                                      ? "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                      : step.color === "purple"
                                        ? "border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                        : "border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                  }`}
                                >
                                  <motion.div
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 2,
                                    }}
                                    className={`absolute inset-0 rounded-full ${
                                      step.color === "cyan"
                                        ? "bg-cyan-400/50"
                                        : step.color === "purple"
                                          ? "bg-purple-400/50"
                                          : "bg-emerald-400/50"
                                    }`}
                                  />
                                </div>
                              </div>
                              <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.05] transition-all duration-500 group relative overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                                  <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-4">
                                      <span
                                        className={`text-[10px] font-black uppercase tracking-widest text-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-400`}
                                      >
                                        {step.month}
                                      </span>
                                      <h4 className="text-xl font-black tracking-tight">
                                        {step.title}
                                      </h4>
                                    </div>
                                    <p className="text-sm text-white/40 leading-relaxed font-medium">
                                      {step.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                      {step.skills.map((skill, si) => (
                                        <span
                                          key={si}
                                          className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="md:w-48 space-y-4">
                                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                                      Project Milestones
                                    </p>
                                    <div className="space-y-2">
                                      {step.projects.map((proj, pi) => (
                                        <div
                                          key={pi}
                                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all"
                                        >
                                          <div
                                            className={`w-1.5 h-1.5 rounded-full bg-${step.color === "cyan" ? "cyan" : step.color === "purple" ? "purple" : "emerald"}-500`}
                                          />
                                          <span className="text-[11px] font-bold text-white/60">
                                            {proj}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* SECTION: Career Risk & Gap Analyzer */}
              <AnimatePresence>
                {isGenerated && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-32 space-y-12"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                        <AlertCircle className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black tracking-tighter">
                          Gap Analysis
                        </h3>
                        <p className="text-sm text-white/40 font-medium">
                          Identifying vulnerabilities in your neural career
                          path.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Strengths",
                          items: [
                            "Analytical Thinking",
                            "Base Tech Stack",
                            "Logic",
                          ],
                          icon: ShieldCheck,
                          color: "emerald",
                        },
                        {
                          title: "Neural Risks",
                          items: [
                            "Market Saturation",
                            "Legacy Tech Bind",
                            "Soft Skills",
                          ],
                          icon: AlertTriangle,
                          color: "rose",
                        },
                        {
                          title: "Skill Gaps",
                          items: [
                            "System Architecture",
                            "Edge Deployment",
                            "Security",
                          ],
                          icon: Target,
                          color: "orange",
                        },
                        {
                          title: "Direct Actions",
                          items: [
                            "Forge 2 Projects",
                            "Link with Mentors",
                            "Cert Sync",
                          ],
                          icon: Zap,
                          color: "cyan",
                        },
                      ].map((card, i) => (
                        <div
                          key={i}
                          className="group relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
                        >
                          <motion.div
                            animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className={`absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full ${
                              card.color === "emerald"
                                ? "bg-emerald-500/20"
                                : card.color === "rose"
                                  ? "bg-rose-500/20"
                                  : card.color === "orange"
                                    ? "bg-orange-500/20"
                                    : "bg-cyan-500/20"
                            }`}
                          />
                          <div className="relative z-10 space-y-6">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:rotate-[12deg] transition-all ${
                                card.color === "emerald"
                                  ? "bg-emerald-500/10 border-emerald-500/20"
                                  : card.color === "rose"
                                    ? "bg-rose-500/10 border-rose-500/20"
                                    : card.color === "orange"
                                      ? "bg-orange-500/10 border-orange-500/20"
                                      : "bg-cyan-500/10 border-cyan-500/20"
                              }`}
                            >
                              <card.icon
                                className={`w-6 h-6 ${
                                  card.color === "emerald"
                                    ? "text-emerald-400"
                                    : card.color === "rose"
                                      ? "text-rose-400"
                                      : card.color === "orange"
                                        ? "text-orange-400"
                                        : "text-cyan-400"
                                }`}
                              />
                            </div>
                            <h4
                              className={`text-xl font-black tracking-tight ${
                                card.color === "emerald"
                                  ? "text-emerald-400"
                                  : card.color === "rose"
                                    ? "text-rose-400"
                                    : card.color === "orange"
                                      ? "text-orange-400"
                                      : "text-cyan-400"
                              }`}
                            >
                              {card.title}
                            </h4>
                            <div className="space-y-3">
                              {card.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-3"
                                >
                                  {card.title === "Direct Actions" ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                                  ) : (
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full ${
                                        card.color === "emerald"
                                          ? "bg-emerald-500/40"
                                          : card.color === "rose"
                                            ? "bg-rose-500/40"
                                            : card.color === "orange"
                                              ? "bg-orange-500/40"
                                              : "bg-cyan-500/40"
                                      }`}
                                    />
                                  )}
                                  <span className="text-[11px] font-bold text-white/50">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(244,63,94,0)",
                          "0 0 40px rgba(244,63,94,0.1)",
                          "0 0 0px rgba(244,63,94,0)",
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="bg-rose-500/5 backdrop-blur-xl border border-rose-500/20 rounded-[40px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-rose-500/50" />
                      <div className="flex items-center gap-8 relative z-10 text-center md:text-left">
                        <div className="w-20 h-20 rounded-[28px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-10 h-10 text-rose-400 rotate-180" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black tracking-tight text-white">
                            Critical Performance Warning
                          </h3>
                          <p className="text-sm text-white/40 font-medium max-w-lg">
                            Neural analysis detects a high probability of skill
                            stagnation in the next 12 cycles. Action
                            recommended.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleResolveConflict}
                        className="h-16 px-10 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[0_20px_40px_rgba(244,63,94,0.3)]"
                      >
                        Resolve Conflict
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
          Neural Pathfinding Engine • v4.0.2 Stable Build
        </p>
      </footer>
    </div>
  );
}
