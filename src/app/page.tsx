"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Mail, Lock, LogIn, Github, Chrome, ArrowRight, User, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for global background spotlight and interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery movement
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // 3D Tilt values - mapped to window dimensions
  const rotateX = useTransform(springY, [0, 1000], [12, -12]);
  const rotateY = useTransform(springX, [0, 1800], [-12, 12]);

  // Parallax values for internal elements (logo, text)
  const innerX = useTransform(springX, [0, 1800], [-25, 25]);
  const innerY = useTransform(springY, [0, 1000], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (typeof window !== 'undefined') {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 260, damping: 20 } 
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#020617] flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans"
    >
      {/* Background Interactive Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dynamic Spotlight */}
        <motion.div 
          style={{
            x: useTransform(springX, (v) => v - 300),
            y: useTransform(springY, (v) => v - 300),
          }}
          className="pointer-events-none absolute w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px]"
        />
        
        {/* Secondary follow light */}
        <motion.div 
          style={{
            x: useTransform(springX, (v) => (v * 0.5) - 200),
            y: useTransform(springY, (v) => (v * 0.5) - 200),
          }}
          className="pointer-events-none absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"
        />

        {/* Interactive Mesh Grid */}
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ perspective: 1500 }}
        className="w-full max-w-md z-10"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="group relative"
        >
          {/* Reactive Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-[2rem] opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-700" />
          
          <Card className="relative bg-black/40 border-white/10 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden rounded-[1.75rem] border-[1px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />
            
            <CardHeader className="space-y-1 relative pt-12 pb-6">
              <motion.div 
                style={{ x: innerX, y: innerY, translateZ: 60 }}
                className="flex justify-center mb-8"
              >
                <div className="relative group/logo">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -inset-6 bg-gradient-to-tr from-purple-600/30 to-blue-600/30 rounded-full blur-2xl"
                  />
                  <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/40 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                    <Zap className="text-white w-10 h-10 fill-white/20" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-center">
                <CardTitle className="text-4xl font-black text-white tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                  Nexus AI
                </CardTitle>
                <CardDescription className="text-slate-400 mt-3 font-medium text-base tracking-tight">
                  Authentication protocol required.
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-6 pt-4 px-8">
              <motion.div variants={itemVariants} className="space-y-2 group/input">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Identity Provider</Label>
                <div className="relative group/field">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within/field:opacity-40 transition duration-500 blur-md" />
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 h-4 w-4 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                    <Input 
                      id="email" 
                      placeholder="nexus.id@vanguard.io" 
                      className="bg-black/60 border-white/10 text-white pl-12 h-14 rounded-xl focus:ring-0 focus:border-white/20 transition-all placeholder:text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2 group/input">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Access Key</Label>
                  <a href="#" className="text-[10px] text-purple-400 hover:text-purple-300 transition-colors font-black uppercase tracking-widest">Override?</a>
                </div>
                <div className="relative group/field">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-focus-within/field:opacity-40 transition duration-500 blur-md" />
                  <div className="relative flex items-center">
                    <Lock className="absolute left-4 h-4 w-4 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••••••"
                      className="bg-black/60 border-white/10 text-white pl-12 h-14 rounded-xl focus:ring-0 focus:border-white/20 transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <Button className="relative w-full h-14 bg-white text-black hover:bg-white/90 border-none font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)] transition-all active:scale-[0.97] overflow-hidden group/btn">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Initialize System
                    <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black">
                  <span className="bg-[#0b0f1a] px-4 text-slate-600">Alternative Uplinks</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pb-2">
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 h-14 rounded-xl transition-all font-bold group/sub">
                  <Github className="mr-2 h-5 w-5 group-hover/sub:scale-110 transition-transform" />
                  Github
                </Button>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 h-14 rounded-xl transition-all font-bold group/sub">
                  <Chrome className="mr-2 h-5 w-5 group-hover/sub:scale-110 transition-transform" />
                  Google
                </Button>
              </motion.div>
            </CardContent>
            
            <CardFooter className="pb-12 pt-4 px-8 flex flex-col items-center gap-6">
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Hardware Security Module Active
              </motion.div>
              
              <motion.p variants={itemVariants} className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                New user?{" "}
                <a href="#" className="text-white hover:text-purple-400 transition-colors underline-offset-8 decoration-purple-500/40 underline decoration-2">Request Credentials</a>
              </motion.p>
            </CardFooter>

            {/* Dynamic Card Internal Shine */}
            <motion.div 
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 80%)",
                x: useTransform(springX, (v) => (v % 1000) - 500),
                y: useTransform(springY, (v) => (v % 800) - 400),
              }}
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            />
          </Card>

          {/* Background depth elements */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" delay-1000="" />
          
          <FloatingElements />
        </motion.div>
      </motion.div>

      {/* Persistent System Info */}
      <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-3 pointer-events-none opacity-30 select-none">
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.4em] font-black text-slate-400">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Nodes: Online</span>
          <span>Latency: 14ms</span>
          <span>Encryption: AES-256</span>
        </div>
        <div className="text-[8px] text-slate-600 font-black tracking-[0.5em] uppercase">
          Nexus v4.2.0-Alpha // Global Infrastructure
        </div>
      </div>
    </div>
  );
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible -z-10">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.5, 1],
            x: Math.sin(i * 45) * 250,
            y: Math.cos(i * 45) * 250,
          }}
          transition={{ 
            duration: 8 + i, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.8 
          }}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-[1px]"
        />
      ))}
    </div>
  );
}
