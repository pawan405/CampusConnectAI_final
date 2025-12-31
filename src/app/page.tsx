"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Lock, Sparkles } from "lucide-react";

// --- Components ---

const MagicBeam = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 1, 0.8, 1], scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[300px] h-[600px] z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 80%)",
          clipPath: "polygon(20% 100%, 80% 100%, 100% 0%, 0% 0%)",
          filter: "blur(20px)",
          transformOrigin: "bottom",
        }}
      />
    )}
  </AnimatePresence>
);

const Particle = ({ i }: { i: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-white rounded-full z-20"
    initial={{ x: 0, y: 0, opacity: 0 }}
    animate={{
      x: (Math.random() - 0.5) * 200,
      y: -Math.random() * 400,
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay: Math.random() * 2,
    }}
    style={{ left: "50%", bottom: "25%" }}
  />
);

const Character = ({ phase }: { phase: number }) => {
  // 0: Loading, 1: Entering, 2: Opening/Action, 3: Standing Apart
  return (
    <motion.div
      className="absolute z-20"
      initial={{ x: "-150%", opacity: 0, scale: 0.9 }}
      animate={
        phase === 1
          ? { x: "-60%", opacity: 1, scale: 1 }
          : phase === 2
          ? { x: "-60%", opacity: 1, scale: 1 }
          : phase >= 3
          ? { x: "-160%", opacity: 0.8, scale: 0.9, filter: "brightness(0.5) blur(1px)" }
          : {}
      }
      transition={{ 
        duration: phase >= 3 ? 1.5 : 2, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ left: "50%", bottom: "18%" }}
    >
      <div className="relative">
        {/* Cinematic Shadow */}
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/40 rounded-[100%] blur-xl"
          animate={phase === 1 ? { scaleX: [0.8, 1.1, 0.8], opacity: [0.3, 0.5, 0.3] } : {}}
          transition={{ repeat: Infinity, duration: 0.6 }}
        />
        
        <svg width="220" height="380" viewBox="0 0 200 360" fill="none" className="drop-shadow-2xl">
          {/* Head & Hair - High Polish */}
          <motion.g animate={phase === 1 ? { y: [0, -4, 0] } : { y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>
            <path d="M70 40 Q100 5 130 40 L138 85 Q100 110 62 85 Z" fill="#1A0F1F" />
            <circle cx="100" cy="65" r="34" fill="#E8B4A2" />
            <rect x="84" y="60" width="8" height="3" rx="1.5" fill="#1A0F1F" />
            <rect x="108" y="60" width="8" height="3" rx="1.5" fill="#1A0F1F" />
            <path d="M90 85 Q100 90 110 85" stroke="#7A5C4F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* Premium Suit */}
          <path d="M60 95 L140 95 L155 210 L45 210 Z" fill="#2D1B36" />
          <path d="M100 95 L100 210 L45 210 L60 95 Z" fill="#23152B" /> {/* Split lighting */}
          <path d="M90 95 L100 120 L110 95" fill="#FFFFFF" /> {/* Shirt collar */}
          <path d="M97 95 L100 115 L103 95" fill="#8B2D8E" /> {/* Tie */}

          {/* Animated Arms */}
          <motion.g
            style={{ originX: "65px", originY: "105px" }}
            animate={
              phase === 1 
                ? { rotate: [20, -20, 20] } 
                : phase === 2 
                ? { rotate: -60, x: -15, y: -10 } 
                : { rotate: 5, y: 5 }
            }
            transition={phase === 1 ? { repeat: Infinity, duration: 0.6 } : { duration: 0.8, ease: "circOut" }}
          >
            <path d="M60 100 L25 190 L45 200 L75 110 Z" fill="#2D1B36" />
            <circle cx="25" cy="195" r="14" fill="#E8B4A2" />
          </motion.g>

          <motion.g
            style={{ originX: "135px", originY: "105px" }}
            animate={
              phase === 1 
                ? { rotate: [-20, 20, -20] } 
                : phase === 2 
                ? { rotate: 60, x: 15, y: -10 } 
                : { rotate: -5, y: 5 }
            }
            transition={phase === 1 ? { repeat: Infinity, duration: 0.6 } : { duration: 0.8, ease: "circOut" }}
          >
            <path d="M140 100 L175 190 L155 200 L125 110 Z" fill="#2D1B36" />
            <circle cx="175" cy="195" r="14" fill="#E8B4A2" />
          </motion.g>

          {/* Legs - Walking */}
          <motion.path 
            d="M70 210 L55 330 L90 330 L95 210 Z" fill="#1A0F1F"
            animate={phase === 1 ? { skewX: [12, -12, 12], scaleY: [1, 0.95, 1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <motion.path 
            d="M105 210 L120 330 L155 330 L130 210 Z" fill="#120914"
            animate={phase === 1 ? { skewX: [-12, 12, -12], scaleY: [0.95, 1, 0.95] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

const Suitcase = ({ phase }: { phase: number }) => {
  return (
    <motion.div
      className="absolute z-10"
      initial={{ opacity: 0, scale: 0.4, y: 80, rotateY: 45 }}
      animate={phase >= 1 ? { opacity: 1, scale: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      style={{ left: "50%", bottom: "16%", x: "-50%" }}
    >
      <div className="relative" style={{ perspective: "1500px" }}>
        {/* Suitcase Body */}
        <div className="relative">
          <svg width="320" height="220" viewBox="0 0 320 220" fill="none">
            <defs>
              <linearGradient id="caseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A1731" />
                <stop offset="100%" stopColor="#120914" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Main Body */}
            <rect x="10" y="70" width="300" height="140" rx="16" fill="url(#caseGrad)" stroke="#3D224D" strokeWidth="2" />
            <rect x="25" y="85" width="270" height="110" rx="10" fill="#1A0F1F" opacity="0.4" />
            
            {/* Gold Latches */}
            <rect x="140" y="125" width="40" height="30" rx="4" fill="#C5A059" filter="url(#goldGlow)" />
            <rect x="145" y="130" width="30" height="20" rx="2" fill="#8B6F39" />
            
            {/* Corner Protectors */}
            <path d="M10 180 Q10 210 40 210" stroke="#3D224D" strokeWidth="6" fill="none" />
            <path d="M310 180 Q310 210 280 210" stroke="#3D224D" strokeWidth="6" fill="none" />
          </svg>

          {/* Lid with 3D Flip */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ originY: "70px", transformStyle: "preserve-3d" }}
            animate={phase >= 2 ? { rotateX: -115, opacity: 0.6 } : { rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="320" height="90" viewBox="0 0 320 90" fill="none">
              <rect x="10" y="5" width="300" height="75" rx="16" fill="#2A1731" stroke="#3D224D" strokeWidth="2" />
              <rect x="110" y="-15" width="100" height="25" rx="6" fill="#120914" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LoginPage() {
  const [phase, setPhase] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 800));
      setPhase(1); // Man enters
      await new Promise(r => setTimeout(r, 2800));
      setPhase(2); // Opens suitcase
      await new Promise(r => setTimeout(r, 1000));
      setShowForm(true); // Form rises
      setPhase(3); // Man stands apart
    };
    sequence();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A050B] flex items-center justify-center font-sans selection:bg-purple-500/30">
      {/* High-End Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F1F] via-[#0A050B] to-[#000000]" />
      
      {/* Volumetric Spotlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full" />

      {/* Grid Floor with Perspective */}
      <div className="absolute bottom-0 w-full h-[35vh] overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 0%, #2A1731 0%, transparent 80%)",
            perspective: "1000px"
          }}
        >
          <div 
            className="w-[200%] h-[200%] left-[-50%] top-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
              transform: "rotateX(75deg)",
              transformOrigin: "top"
            }}
          />
        </div>
      </div>

      <MagicBeam active={phase >= 2} />
      {phase >= 2 && [...Array(20)].map((_, i) => <Particle key={i} i={i} />)}

      <Character phase={phase} />
      <Suitcase phase={phase} />

      {/* The Cinematic Form */}
      <div className="relative z-30 w-full max-w-lg px-6">
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 300, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 80,
                mass: 1.2
              }}
              className="group"
            >
              <div className="relative p-[1px] rounded-[32px] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden shadow-[0_0_100px_rgba(139,45,142,0.15)]">
                <div className="bg-[#120914]/80 backdrop-blur-[40px] rounded-[31px] p-10 md:p-14 relative overflow-hidden">
                  {/* Decorative Sparkle */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-10 -right-10 text-purple-500/20"
                  >
                    <Sparkles size={120} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative z-10"
                  >
                    <h2 className="text-5xl font-extralight text-white mb-3 tracking-tighter">
                      The <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Inner Circle</span>
                    </h2>
                    <p className="text-purple-200/40 mb-10 text-lg font-light leading-relaxed">
                      Emerged from the depths. Secure your passage.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-purple-300/60 uppercase tracking-[0.3em] ml-1">Identity</label>
                        <div className="relative group/input">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/30 group-focus-within/input:text-purple-400 transition-colors" size={20} />
                          <Input 
                            className="bg-white/5 border-white/10 text-white h-16 pl-12 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/10" 
                            placeholder="Your Name" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-purple-300/60 uppercase tracking-[0.3em] ml-1">Frequency</label>
                        <div className="relative group/input">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/30 group-focus-within/input:text-purple-400 transition-colors" size={20} />
                          <Input 
                            className="bg-white/5 border-white/10 text-white h-16 pl-12 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder:text-white/10" 
                            type="email" 
                            placeholder="nexus@protocol.com" 
                          />
                        </div>
                      </div>

                      <Button className="w-full h-16 bg-white text-black hover:bg-purple-100 font-bold rounded-2xl transition-all active:scale-[0.98] text-lg mt-4 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                        Initialize Connection
                      </Button>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-4">
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">Protocol V2.4</p>
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-purple-500' : 'bg-white/10'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Dust Particles - Ambient */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
