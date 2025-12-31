"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Mail, Lock, LogIn, Github, Chrome, ArrowRight, User, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ThreeDBackground from "@/components/ThreeDBackground";

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for global background spotlight and interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery movement
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // 3D Tilt values - mapped to window dimensions
  const rotateX = useTransform(springY, [0, 1000], [10, -10]);
  const rotateY = useTransform(springX, [0, 1800], [-10, 10]);

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
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(8px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 200, damping: 20 } 
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center p-4 selection:bg-purple-500/30 font-sans"
    >
      {/* 3D World Layer */}
      <Suspense fallback={<div className="absolute inset-0 bg-black animate-pulse" />}>
        <ThreeDBackground />
      </Suspense>

      {/* Overlay vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ perspective: 1200 }}
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
          {/* Neon Glow Frame */}
          <div className="absolute -inset-[2px] bg-gradient-to-br from-purple-500 via-blue-400 to-emerald-400 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-60 transition-opacity duration-1000" />
          
          <Card className="relative bg-black/60 border-white/5 backdrop-blur-[40px] shadow-2xl overflow-hidden rounded-[2.25rem] border-[1px]">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <CardHeader className="space-y-1 relative pt-12 pb-4">
              <motion.div 
                variants={itemVariants}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      boxShadow: ["0 0 20px rgba(168,85,247,0.2)", "0 0 40px rgba(168,85,247,0.4)", "0 0 20px rgba(168,85,247,0.2)"],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative w-20 h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-white/10"
                  >
                    <div className="absolute inset-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Sparkles className="text-white w-8 h-8" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="text-center">
                <CardTitle className="text-5xl font-black text-white tracking-tight leading-none">
                  Nexus
                </CardTitle>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-700" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Initialize Session</span>
                  <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-700" />
                </div>
              </motion.div>
            </CardHeader>
            
            <CardContent className="space-y-5 pt-6 px-10">
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="relative group/field">
                  <Input 
                    placeholder="E-mail address" 
                    className="bg-white/5 border-white/5 text-white h-14 rounded-2xl focus:ring-0 focus:border-purple-500/50 transition-all placeholder:text-slate-600 font-medium text-base px-6 border-b-2 border-b-white/5 group-focus-within/field:border-b-purple-500/50 shadow-inner"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <div className="relative group/field">
                  <Input 
                    type="password" 
                    placeholder="Access Code"
                    className="bg-white/5 border-white/5 text-white h-14 rounded-2xl focus:ring-0 focus:border-blue-500/50 transition-all placeholder:text-slate-600 text-base px-6 border-b-2 border-b-white/5 group-focus-within/field:border-b-blue-500/50 shadow-inner"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <Button className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-none font-bold text-base rounded-2xl shadow-xl shadow-purple-500/20 transition-all active:scale-[0.98] group/btn">
                  Enter The Nexus
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" className="bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white h-12 rounded-xl transition-all border-b border-b-white/5">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white h-12 rounded-xl transition-all border-b border-b-white/5">
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </motion.div>
            </CardContent>
            
            <CardFooter className="pb-10 pt-4 px-10 flex flex-col items-center gap-4">
              <motion.p variants={itemVariants} className="text-xs text-slate-500 font-medium">
                No access? <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors font-bold underline decoration-purple-500/20 underline-offset-4">Join waitlist</a>
              </motion.p>
            </CardFooter>

            {/* Shine effect that follows mouse inside the card */}
            <motion.div 
              style={{
                background: "radial-gradient(600px circle at center, rgba(255,255,255,0.05), transparent 40%)",
                x: useTransform(springX, (v) => v - 800),
                y: useTransform(springY, (v) => v - 400),
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </Card>
        </motion.div>
      </motion.div>

      {/* Bruno Simon inspired floating text or badge */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 flex items-center gap-4 z-20"
      >
        <div className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Ready</span>
        </div>
      </motion.div>
    </div>
  );
}
