"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GlitchText = ({ children, className }: { children: string; className?: string }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {glitch && (
        <>
          <span className="absolute inset-0 text-red-500/80 translate-x-[2px] translate-y-[-2px] z-0">{children}</span>
          <span className="absolute inset-0 text-cyan-500/80 translate-x-[-2px] translate-y-[2px] z-0">{children}</span>
        </>
      )}
    </span>
  );
};

const DNAHelix = () => (
  <div className="absolute left-8 top-0 h-full w-20 overflow-hidden opacity-20 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-full"
        style={{ top: `${i * 5}%` }}
        animate={{ 
          x: [0, 30, 0, -30, 0],
          scale: [1, 0.8, 1, 0.8, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
      >
        <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto" />
        <div className="w-px h-8 bg-gradient-to-b from-emerald-500 to-transparent mx-auto" />
      </motion.div>
    ))}
  </div>
);

const NeuralNetwork = () => {
  const nodes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 20 + (i % 4) * 25,
    y: 20 + Math.floor(i / 4) * 30,
  }));

  return (
    <svg className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((target, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={`${node.x}%`}
            y1={`${node.y}%`}
            x2={`${target.x}%`}
            y2={`${target.y}%`}
            stroke="#10b981"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))
      )}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r="4"
          fill="#10b981"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: node.id * 0.1 }}
        />
      ))}
    </svg>
  );
};

const FloatingOrb = ({ delay, size, color }: { delay: number; size: number; color: string }) => (
  <motion.div
    className="absolute rounded-full blur-xl pointer-events-none"
    style={{ width: size, height: size, background: color }}
    animate={{
      x: [0, 100, -50, 100, 0],
      y: [0, -80, 50, -100, 0],
      scale: [1, 1.2, 0.8, 1.1, 1],
    }}
    transition={{ duration: 20, repeat: Infinity, delay }}
  />
);

const CyberCharacter = ({ phase }: { phase: number }) => (
  <motion.div
    className="absolute z-20 hidden lg:block"
    initial={{ opacity: 0, x: 50 }}
    animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 1, type: "spring", damping: 15 }}
    style={{ right: "8%", bottom: "15%" }}
  >
    <motion.svg 
      width="200" height="340" viewBox="0 0 200 340"
      animate={phase === 2 ? { filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] } : {}}
      transition={{ duration: 2, repeat: phase === 2 ? Infinity : 0 }}
    >
      <defs>
        <linearGradient id="cyber" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      
      <motion.g filter="url(#glow)" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <polygon points="100,10 130,50 100,70 70,50" fill="url(#cyber)" opacity="0.9" />
        <rect x="85" y="35" width="6" height="2" fill="#000" rx="1" />
        <rect x="109" y="35" width="6" height="2" fill="#000" rx="1" />
        <path d="M92 55 Q100 60 108 55" stroke="#000" strokeWidth="2" fill="none" />
      </motion.g>

      <path d="M60 70 L140 70 L150 180 L50 180 Z" fill="url(#cyber)" opacity="0.8" />
      
      <motion.g
        animate={phase === 1 ? { rotate: [30, -30, 30] } : phase === 2 ? { rotate: -80 } : { rotate: 10 }}
        style={{ originX: "70px", originY: "80px" }}
        transition={{ duration: 0.6, repeat: phase === 1 ? Infinity : 0 }}
      >
        <path d="M60 75 L20 160 L40 170 L70 85 Z" fill="url(#cyber)" opacity="0.7" />
      </motion.g>
      
      <motion.g
        animate={phase === 1 ? { rotate: [-30, 30, -30] } : phase === 2 ? { rotate: 80 } : { rotate: -10 }}
        style={{ originX: "130px", originY: "80px" }}
        transition={{ duration: 0.6, repeat: phase === 1 ? Infinity : 0 }}
      >
        <path d="M140 75 L180 160 L160 170 L130 85 Z" fill="url(#cyber)" opacity="0.7" />
      </motion.g>

      <motion.path 
        d="M70 180 L55 300 L85 300 L90 180 Z" fill="url(#cyber)" opacity="0.6"
        animate={phase === 1 ? { skewX: [10, -10, 10] } : {}}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
      <motion.path 
        d="M110 180 L115 300 L145 300 L130 180 Z" fill="url(#cyber)" opacity="0.6"
        animate={phase === 1 ? { skewX: [-10, 10, -10] } : {}}
        transition={{ repeat: Infinity, duration: 0.6 }}
      />
    </motion.svg>
  </motion.div>
);



export default function LoginPage() {
  const [phase, setPhase] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { damping: 30 });

  useEffect(() => {
    const run = async () => {
      await new Promise(r => setTimeout(r, 600));
      setPhase(1);
      await new Promise(r => setTimeout(r, 2000));
      setPhase(2);
      await new Promise(r => setTimeout(r, 1200));
      setShowForm(true);
      setPhase(3);
    };
    run();
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  return (
    <div
      onMouseMove={handleMouse}
      className="relative min-h-screen w-full overflow-hidden bg-[#030712] flex items-center justify-center"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <FloatingOrb delay={0} size={400} color="rgba(16,185,129,0.08)" />
      <FloatingOrb delay={5} size={300} color="rgba(139,92,246,0.08)" />
      <FloatingOrb delay={10} size={350} color="rgba(6,182,212,0.08)" />

      <DNAHelix />
      <NeuralNetwork />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNiwxODUsMTI5LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

      <CyberCharacter phase={phase} />
      <HolographicCase phase={phase} />
      <EnergyBurst active={phase === 2} />

      <motion.div
        style={{ perspective: "1200px", rotateX, rotateY }}
        className="relative z-30 w-full max-w-xl px-6"
      >
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, z: -500, rotateX: 90 }}
              animate={{ opacity: 1, z: 0, rotateX: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 60 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-[2px] rounded-3xl opacity-70"
                  style={{ background: "linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6, #10b981)" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative bg-[#030712]/95 backdrop-blur-xl rounded-3xl p-10 md:p-14 border border-emerald-500/20">
                  <div className="absolute top-4 right-4 flex gap-2">
                    {["#10b981", "#f59e0b", "#ef4444"].map((c, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{ background: c }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      />
                    ))}
                  </div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <div className="mb-10">
                      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 mb-2">
                        <GlitchText>GENESIS</GlitchText>
                      </h1>
                      <div className="flex items-center gap-2 text-emerald-500/60 text-xs uppercase tracking-[0.4em]">
                        <motion.div
                          className="w-2 h-2 bg-emerald-500 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                        Neural Authentication v3.0
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="group">
                        <label className="text-[10px] text-emerald-500/50 uppercase tracking-[0.3em] mb-2 block">
                          // IDENTITY_MATRIX
                        </label>
                        <Input
                          className="h-14 bg-emerald-500/5 border-emerald-500/20 text-emerald-100 rounded-xl focus:border-emerald-500 focus:ring-emerald-500/20 transition-all placeholder:text-emerald-500/20 font-mono"
                          placeholder="enter.username"
                        />
                      </div>

                      <div className="group">
                        <label className="text-[10px] text-cyan-500/50 uppercase tracking-[0.3em] mb-2 block">
                          // COMM_FREQUENCY
                        </label>
                        <Input
                          type="email"
                          className="h-14 bg-cyan-500/5 border-cyan-500/20 text-cyan-100 rounded-xl focus:border-cyan-500 focus:ring-cyan-500/20 transition-all placeholder:text-cyan-500/20 font-mono"
                          placeholder="signal@nexus.io"
                        />
                      </div>

                      <div className="group">
                        <label className="text-[10px] text-violet-500/50 uppercase tracking-[0.3em] mb-2 block">
                          // ACCESS_KEY
                        </label>
                        <Input
                          type="password"
                          className="h-14 bg-violet-500/5 border-violet-500/20 text-violet-100 rounded-xl focus:border-violet-500 focus:ring-violet-500/20 transition-all placeholder:text-violet-500/20 font-mono"
                          placeholder="••••••••••••"
                        />
                      </div>

                      <Button className="w-full h-16 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 text-black font-bold text-lg rounded-xl hover:opacity-90 transition-all active:scale-[0.98] mt-4 relative overflow-hidden group">
                        <span className="relative z-10">INITIALIZE CONNECTION</span>
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </Button>
                    </div>

                    <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
                      <div className="text-[10px] text-white/20 font-mono">
                        <span className="text-emerald-500">$</span> status: <span className="text-emerald-400">READY</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-4 bg-emerald-500/30 rounded-full"
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </div>
  );
}
