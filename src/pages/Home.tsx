import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Mic,
  Shield,
  Sparkles,
  ArrowRight,
  Brain,
  Rocket,
  Code,
  Lock,
  Zap,
  CheckCircle2,
  Users,
  Trophy,
  Briefcase,
  Activity,
  Cpu,
  Globe,
  Terminal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import ThreeDBackground from "@/components/ThreeDBackground";

const FadeIn = ({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
  href,
  badge,
}: {
  icon: React.ElementType<any>;
  title: string;
  description: string;
  delay: number;
  badge?: string;
  href: string;
}) => (
  <FadeIn delay={delay}>
    <Link to={href} className="block h-full group">
      <div className="relative h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/30 transition-all duration-300 rounded-xl overflow-hidden group-hover:bg-zinc-900/60 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/20 transition-all duration-300">
              <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            {badge && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-zinc-500 text-xs leading-relaxed mb-4 group-hover:text-zinc-400 transition-colors">
            {description}
          </p>
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-blue-500 transition-all">
            Execute Module <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  </FadeIn>
);

export default function Home() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <ThreeDBackground />

      {/* Control Bar (Navbar) */}
      <nav className="fixed top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 p-px shadow-lg shadow-blue-500/10">
              <div className="w-full h-full rounded-[7px] bg-black flex items-center justify-center">
                <Cpu className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <span className="text-lg font-black tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
              CampusConnect<span className="text-blue-500">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 px-1 py-1 rounded-xl bg-white/5 border border-white/5">
            {[
              { label: "Core System", href: "/" },
              { label: "Capabilities", href: "#features" },
              { label: "Network", href: "#community" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="h-10 px-5 rounded-lg border-white/10 bg-white/5 text-white hover:bg-white hover:text-black font-bold text-[11px] uppercase tracking-wider transition-all active:scale-95"
            >
              <FcGoogle className="w-4 h-4 mr-2" />
              System Access
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6 max-w-[1400px] mx-auto space-y-24">
        {/* System Header (Hero) */}
        <section className="relative py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">System Status: Optimal</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                  Build Your <br /> Future with AI.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-500 max-w-xl font-medium leading-relaxed">
                The high-performance AI ecosystem for the next generation of innovators. 
                Your career trajectory, calculated in real-time.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  onClick={handleGoogleLogin}
                  className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] group"
                >
                  Initialize System
                  <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex items-center gap-3 px-6 h-14 rounded-xl border border-white/5 bg-white/5">
                  <Terminal className="w-4 h-4 text-zinc-500" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">v5.0.0-PRO // STABLE</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block lg:col-span-4">
              <div className="relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full" />
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Neural Load</span>
                    <span className="text-[10px] font-mono text-blue-400">84%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "84%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                  <div className="space-y-4 pt-4">
                    {[
                      { icon: Shield, label: "Security Layer", status: "Active" },
                      { icon: Activity, label: "Network Sync", status: "Online" },
                      { icon: Globe, label: "Global Reach", status: "Enabled" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-3.5 h-3.5 text-zinc-600" />
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{item.label}</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600 uppercase">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Modules (Features) */}
        <section id="features" className="space-y-10">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black tracking-tighter uppercase whitespace-nowrap">
              System Modules
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon={Brain}
              title="AI Roadmap"
              description="Calculate learning vectors and personalized success trajectories."
              delay={0.1}
              badge="Module 01"
              href="/ai-roadmap"
            />
            <FeatureCard
              icon={Trophy}
              title="Intelligence Feed"
              description="Real-time stream of global hackathons and competitive modules."
              delay={0.2}
              badge="Live Feed"
              href="/hackathons"
            />
            <FeatureCard
              icon={Briefcase}
              title="Opportunity Engine"
              description="High-affinity internship matching across the tech ecosystem."
              delay={0.3}
              badge="Hot"
              href="/internship-feed"
            />
            <FeatureCard
              icon={Mic}
              title="Secure System Tool"
              description="Encrypted anonymous reporting and peer support interface."
              delay={0.4}
              badge="Protected"
              href="/silent-scream"
            />
          </div>
        </section>

        {/* Secondary Modules */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          <FeatureCard
            icon={Shield}
            title="Secure Layer"
            description="End-to-end encryption for all system interactions and data."
            delay={0.5}
            href="/privacy"
          />
          <FeatureCard
            icon={Users}
            title="Peer Network"
            description="Connect with high-performance innovators and mentors."
            delay={0.6}
            href="/community"
          />
          <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl p-8 border border-blue-500/20 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">Initialize Pro</h3>
              <p className="text-zinc-500 text-xs font-medium leading-relaxed">
                Upgrade to the enterprise-grade AI suite for advanced neural mapping.
              </p>
            </div>
            <Link to="/pricing" className="relative z-10 mt-8">
              <Button className="w-full h-12 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 hover:text-white transition-all">
                Access Premium
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">CampusConnect AI // v5.0.0</span>
          </div>
          <p className="text-[10px] font-medium uppercase tracking-widest">
            Neural Link Established // All Rights Reserved 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
