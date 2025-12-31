"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Mail, Lock, LogIn, Github, Chrome, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020617] flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Animated floating shapes */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-12 h-12 border border-white/10 rounded-xl backdrop-blur-sm hidden md:block"
      />
      <motion.div 
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[15%] w-16 h-16 border border-white/10 rounded-full backdrop-blur-sm hidden md:block"
      />

      <motion.div
        style={{
          perspective: 1000,
        }}
        className="w-full max-w-md z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />
            
            <CardHeader className="space-y-1 relative pt-8">
              <div className="flex justify-center mb-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20"
                >
                  <User className="text-white w-6 h-6" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-white tracking-tight">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-slate-400">
                Enter your credentials to access your 3D workspace
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2 group/input">
                <Label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                  <Input 
                    id="email" 
                    placeholder="name@example.com" 
                    className="bg-white/5 border-white/10 text-white pl-10 h-11 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2 group/input">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-300">Password</Label>
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500 group-focus-within/input:text-purple-400 transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white pl-10 h-11 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>
              </div>

              <Button className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-none text-white font-semibold shadow-lg shadow-purple-500/20 transition-all active:scale-[0.98]">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#020617] px-2 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-11 transition-all">
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Button>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white h-11 transition-all">
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="pb-8 flex justify-center">
              <p className="text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <a href="#" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors underline-offset-4 hover:underline">Sign up</a>
              </p>
            </CardFooter>

            {/* Shine effect on card */}
            <motion.div 
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 80%)",
                x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
                y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
              }}
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </Card>
        </motion.div>
      </motion.div>

      {/* Footer copyright */}
      <div className="absolute bottom-6 left-0 w-full text-center text-slate-500 text-xs">
        © 2024 Nexus Design System. All rights reserved.
      </div>
    </div>
  );
}
