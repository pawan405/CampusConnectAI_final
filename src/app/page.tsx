"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Chrome, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Character({ phase }: { phase: number }) {
  return (
    <motion.div
      className="absolute z-20"
      initial={{ x: -300, opacity: 0 }}
    animate={
      phase === 0
        ? { x: -300, opacity: 0 }
        : phase === 1
        ? { x: -80, opacity: 1 }
        : { x: -280, opacity: 1 }
    }
    transition={{ 
      duration: phase >= 2 ? 1 : 1.2, 
      ease: [0.22, 1, 0.36, 1],
      delay: phase === 2 ? 0.2 : 0 
    }}
      style={{ bottom: "10%", left: "50%" }}
    >
      <div className="relative" style={{ transform: "scale(0.9)" }}>
        <motion.div
          animate={phase >= 2 ? { rotate: [0, -5, 0, 5, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="180" height="320" viewBox="0 0 180 320" fill="none">
            <motion.g
              animate={phase === 2 ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <circle cx="90" cy="45" r="35" fill="#F5D0C5" />
              <ellipse cx="90" cy="30" rx="38" ry="25" fill="#D4A574" />
              <circle cx="78" cy="45" r="4" fill="#2D2D2D" />
              <circle cx="102" cy="45" r="4" fill="#2D2D2D" />
              <ellipse cx="90" cy="58" rx="4" ry="2" fill="#C4A08A" />
              <path d="M82 65 Q90 70 98 65" stroke="#8B6F5C" strokeWidth="2" fill="none" />
            </motion.g>

            <motion.g
              animate={phase === 2 ? { scaleY: [1, 0.98, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ originY: 0 }}
            >
              <path d="M60 85 L120 85 L125 180 L55 180 Z" fill="#6B5B95" />
              <path d="M60 85 L90 85 L90 180 L55 180 Z" fill="#5D4E85" />
            </motion.g>

            <motion.g
              animate={
                phase === 2
                  ? { rotate: -45, x: -20, y: -30 }
                  : phase >= 3
                  ? { rotate: -20, x: -40, y: 0 }
                  : {}
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ originX: "60px", originY: "90px" }}
            >
              <path d="M60 90 L30 140 L35 145 L65 100 Z" fill="#6B5B95" />
              <circle cx="28" cy="145" r="12" fill="#F5D0C5" />
            </motion.g>

            <motion.g
              animate={
                phase === 2
                  ? { rotate: 45, x: 20, y: -30 }
                  : phase >= 3
                  ? { rotate: 20, x: 40, y: 0 }
                  : {}
              }
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ originX: "120px", originY: "90px" }}
            >
              <path d="M120 90 L150 140 L145 145 L115 100 Z" fill="#6B5B95" />
              <circle cx="152" cy="145" r="12" fill="#F5D0C5" />
            </motion.g>

            <path d="M65 180 L60 280 L80 280 L85 180 Z" fill="#3D3D3D" />
            <path d="M95 180 L100 280 L120 280 L115 180 Z" fill="#3D3D3D" />

            <ellipse cx="70" cy="290" rx="18" ry="8" fill="#8B7355" />
            <ellipse cx="110" cy="290" rx="18" ry="8" fill="#8B7355" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Suitcase({ phase, onOpenComplete }: { phase: number; onOpenComplete: () => void }) {
  useEffect(() => {
    if (phase === 2) {
      const timer = setTimeout(onOpenComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onOpenComplete]);

  return (
    <motion.div
      className="absolute z-10"
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={
        phase >= 1
          ? { scale: 1, opacity: 1, y: 0 }
          : { scale: 0, opacity: 0, y: 100 }
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: phase === 1 ? 0.5 : 0 }}
      style={{ bottom: "15%", left: "50%", x: "-50%" }}
    >
      <div className="relative" style={{ perspective: "1000px" }}>
        <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
          <rect x="20" y="80" width="260" height="110" rx="8" fill="#2D2D2D" />
          <rect x="25" y="85" width="250" height="100" rx="6" fill="#1A1A1A" />
          
          <rect x="130" y="130" width="40" height="25" rx="3" fill="#FFD700" />
          <rect x="135" y="135" width="30" height="15" rx="2" fill="#B8860B" />
          
          <rect x="60" y="185" width="30" height="8" rx="2" fill="#1A1A1A" />
          <rect x="210" y="185" width="30" height="8" rx="2" fill="#1A1A1A" />
        </svg>

        <motion.div
          className="absolute top-0 left-0"
          initial={{ rotateX: 0 }}
          animate={phase >= 2 ? { rotateX: -120 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: "100%", transformStyle: "preserve-3d" }}
        >
          <svg width="300" height="90" viewBox="0 0 300 90" fill="none">
            <rect x="20" y="0" width="260" height="80" rx="8" fill="#3D3D3D" />
            <rect x="25" y="5" width="250" height="70" rx="6" fill="#2D2D2D" />
            
            <rect x="120" y="-15" width="60" height="20" rx="4" fill="#4A4A4A" />
            <rect x="140" y="-20" width="20" height="10" rx="3" fill="#3D3D3D" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, y: -20, scale: 1 } : { opacity: 0, y: 50, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ top: "-30px", left: "50%", x: "-50%" }}
        >
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-purple-500"
                initial={{ scale: 0 }}
                animate={phase >= 2 ? { scale: [0, 1.5, 1] } : { scale: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LoginForm({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, y: 100, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-30 w-full max-w-md"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            initial={{ boxShadow: "0 0 0 rgba(147, 51, 234, 0)" }}
            animate={{ boxShadow: "0 0 80px rgba(147, 51, 234, 0.3)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative bg-[#7B2D8E] rounded-2xl overflow-hidden"
          >
            <button className="absolute top-3 right-3 text-white/50 hover:text-white text-xl leading-none">
              ×
            </button>

            <div className="p-8 pt-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white text-center mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Connect with Us
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/70 text-center text-sm mb-8"
              >
                Subscribe and stay up to date on the latest news,<br />
                get exclusive offers and special gifts.
              </motion.p>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-white text-sm mb-1 block">
                    Your Name <span className="text-yellow-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                      <Input
                        placeholder="First Name"
                        className="bg-white border-none h-12 pl-10 rounded-lg text-gray-800 placeholder:text-gray-400"
                      />
                    </div>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                      <Input
                        placeholder="Last Name"
                        className="bg-white border-none h-12 pl-10 rounded-lg text-gray-800 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-white text-sm mb-1 block">
                    Your Email <span className="text-yellow-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                    <Input
                      type="email"
                      placeholder="Ex. yourname@mycompany.com"
                      className="bg-white border-none h-12 pl-10 rounded-lg text-gray-800 placeholder:text-gray-400"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <Button className="w-full h-12 bg-[#1A1A2E] hover:bg-[#2A2A3E] text-white font-semibold rounded-lg transition-all">
                    Sign Me Up
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/50 text-xs text-right pt-2"
                >
                  Step 1 of 1
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LoginPage() {
  const [phase, setPhase] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSuitcaseOpen = () => {
    setTimeout(() => setShowForm(true), 200);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#7B2D8E] flex items-center justify-center">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 30% 50%, #9B4DB8 0%, #7B2D8E 50%, #5A1D6E 100%)",
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-white/50 text-lg font-light tracking-widest"
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Character phase={phase} />
      <Suitcase phase={phase} onOpenComplete={handleSuitcaseOpen} />

      <div className="relative z-30 flex items-center justify-center w-full px-4">
        <LoginForm show={showForm} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 right-6 z-40"
      >
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
          <span className="text-white/60 text-xs font-medium">
            Interactive Form Experience
          </span>
        </div>
      </motion.div>
    </div>
  );
}
