import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  Trophy,
  Target,
  Users,
  Zap,
  Activity,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import ThreeDBackground from "../components/ThreeDBackground";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";

const growthData = [
  { month: "Sep", progress: 45 },
  { month: "Oct", progress: 52 },
  { month: "Nov", progress: 61 },
  { month: "Dec", progress: 68 },
  { month: "Jan", progress: 84 },
];

const skillData = [
  { subject: "Technical", A: 85, fullMark: 100 },
  { subject: "Problem Solving", A: 90, fullMark: 100 },
  { subject: "Teamwork", A: 75, fullMark: 100 },
  { subject: "Communication", A: 80, fullMark: 100 },
  { subject: "Leadership", A: 65, fullMark: 100 },
  { subject: "Consistency", A: 95, fullMark: 100 },
];

const stats = [
  { label: "Hackathons Joined", value: "12", icon: Trophy, color: "cyan" },
  { label: "Finalist / Won", value: "4", icon: Award, color: "purple" },
  { label: "Skills Improved", value: "8", icon: Zap, color: "amber" },
  { label: "Projects Done", value: "15", icon: BookOpen, color: "emerald" },
  { label: "Team Collabs", value: "24", icon: Users, color: "blue" },
  { label: "Consistency", value: "98%", icon: Activity, color: "rose" },
];

export default function NeuralIntelligence() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <ThreeDBackground />
      
      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 text-white/60 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4" /> Back to Core
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-px">
                <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-black tracking-tighter text-lg uppercase">Neural Intelligence</span>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
          {/* Header Section */}
          <header className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 px-4 py-1 uppercase tracking-[0.2em] font-black text-[10px]">
                  Career Progress Overview
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                  EVOLVING <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">BEYOND LIMITS.</span>
                </h1>
                <p className="text-white/40 text-lg max-w-2xl font-medium">
                  Your growth, skills, and readiness explained through neural analysis and real-time activity tracking.
                </p>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[40px] p-10 flex flex-col items-center justify-center min-w-[240px]">
                  <span className="text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    84%
                  </span>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mt-2">
                    Readiness Score
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* AI Summary Section */}
          <section>
            <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                  AI Synthesis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <p className="text-xl text-white/90 leading-relaxed font-medium">
                      "You've shown strong consistency in hackathons and technical skill development. Your problem-solving speed has increased by 15% in the last 60 days."
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-wider mb-2">Strongest Sector</p>
                        <p className="font-bold text-white">Full-Stack Dev</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-wider mb-2">Growth Vector</p>
                        <p className="font-bold text-white">AI Integration</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Critical Insight</h4>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                          <Target className="w-5 h-5 text-cyan-400" />
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          To reach the next level, focus more on real-world projects and leadership roles. Your technical skills are solid, but team orchestration is your next frontier.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 rounded-[32px] bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 italic text-white/80 font-medium">
                      "The master has failed more times than the beginner has even tried. Keep pushing the boundaries of your logic."
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Stats Breakdown */}
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[32px] p-6 text-center hover:bg-white/10 transition-all hover:border-white/30 group"
              >
                <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4 bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </section>

          {/* Visualization Section */}
          <section className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[48px] p-8">
              <CardHeader className="px-0 pb-8">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  Growth Velocity
                </CardTitle>
              </CardHeader>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#ffffff40" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#ffffff40" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff20', borderRadius: '12px' }}
                      itemStyle={{ color: '#06b6d4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#06b6d4" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorProgress)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-black/40 backdrop-blur-3xl border-white/10 rounded-[48px] p-8">
              <CardHeader className="px-0 pb-8">
                <CardTitle className="text-lg font-black uppercase flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  Skill Matrix
                </CardTitle>
              </CardHeader>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                    <PolarGrid stroke="#ffffff10" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff40', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="User"
                      dataKey="A"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </section>

          {/* Contribution Impact */}
          <section className="space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tight">Growth Contribution</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: "Hackathon Impact", value: 88, color: "cyan", icon: Trophy, desc: "Participation in high-level events boosted readiness." },
                { label: "Skill Practice", value: 74, color: "purple", icon: Zap, desc: "Daily neuro-drills and skill syncs added consistency." },
                { label: "Project Synergy", value: 92, color: "emerald", icon: Rocket, desc: "Completed real-world projects bridged the gap." },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6 hover:bg-white/10 transition-all">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center border border-${item.color}-500/20`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    </div>
                    <span className="text-2xl font-black">{item.value}%</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <Progress value={item.value} className={`h-1.5 bg-white/5`} />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section className="bg-gradient-to-br from-cyan-900/40 via-purple-900/40 to-black border border-white/20 rounded-[56px] p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tight">What You Can Do Next</h3>
                <p className="text-white/40 font-medium">Actionable steps to reach the 90%+ readiness elite tier.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Master AI Orchestration", icon: Brain, color: "cyan", action: "Complete 2 more AI-integrated projects." },
                  { title: "Lead a Squad", icon: Users, color: "purple", action: "Take lead role in the upcoming Global Hackathon." },
                  { title: "Technical Deep-Dive", icon: Cpu, color: "blue", action: "Improve your low-level system design score." },
                  { title: "Real-World Deployment", icon: Globe, color: "emerald", action: "Deploy a project with 100+ active neurons." },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 rounded-[32px] bg-black/40 border border-white/10 hover:border-white/30 transition-all cursor-pointer group/step">
                    <div className={`w-14 h-14 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center border border-${step.color}-500/20 group-hover/step:scale-110 transition-transform`}>
                      <step.icon className={`w-6 h-6 text-${step.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-white">{step.title}</p>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">{step.action}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover/step:text-white transition-colors" />
                  </div>
                ))}
              </div>
              
              <Button className="h-16 w-full rounded-[24px] bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-cyan-400 transition-all">
                Sync New Goals
              </Button>
            </div>
          </section>
        </main>

        <footer className="py-24 text-center border-t border-white/5">
          <p className="text-[10px] font-black text-white/10 uppercase tracking-[1em]">
            Neural Career Engine // Evolving with you
          </p>
        </footer>
      </div>
    </div>
  );
}
