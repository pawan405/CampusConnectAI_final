"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Mic,
  Briefcase,
  MapPin,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Brain,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function FloatingParticle({
  delay,
  x,
  y,
}: {
  delay: number;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-60"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 4, repeat: Infinity, delay }}
    />
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient,
  href,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Link href={href}>
        <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full">
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${gradient}`}
          />
          <CardContent className="p-8">
            <div
              className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
              Explore <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-slate-600 dark:text-slate-400 text-sm mt-2">
        {label}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-full blur-3xl" />
        {[...Array(12)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            x={Math.random() * 100}
            y={Math.random() * 100}
          />
        ))}
      </div>

      <nav className="relative z-50 border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                CampusConnect AI
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/silent-scream"
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Silent Scream
              </Link>
              <Link
                href="/internship-feed"
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                Internship Feed
              </Link>
              <Link
                href="/ai-roadmap"
                className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
              >
                AI Roadmap
              </Link>
            </div>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-lg shadow-blue-500/25">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-8"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Campus Safety & Career Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight mb-6"
            >
              Your Campus,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Empowering students with AI-driven safety reporting, peer
              learning, and personalized career guidance. All in one secure
              platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8 py-6 text-lg shadow-xl shadow-blue-500/25"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg border-2"
                >
                  Explore Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatCard value="5K+" label="Active Students" delay={0.1} />
            <StatCard value="150+" label="Reports Resolved" delay={0.2} />
            <StatCard value="500+" label="Internship Posts" delay={0.3} />
            <StatCard value="98%" label="Satisfaction Rate" delay={0.4} />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Core Features
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Three powerful tools designed to enhance campus life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Mic}
              title="Silent Scream"
              description="Anonymous voice-based reporting system. Upload audio, get AI-powered transcription and summary. Your voice matters, your identity stays protected."
              gradient="bg-gradient-to-br from-red-500 to-pink-600"
              href="/silent-scream"
              delay={0.1}
            />
            <FeatureCard
              icon={Briefcase}
              title="Internship Feed"
              description="Share and discover internship experiences. Real stories from real students. Find opportunities that match your skills and interests."
              gradient="bg-gradient-to-br from-blue-500 to-cyan-600"
              href="/internship-feed"
              delay={0.2}
            />
            <FeatureCard
              icon={MapPin}
              title="AI Career Roadmap"
              description="Get personalized career paths powered by AI. Enter your details and receive a structured roadmap tailored to your goals and timeline."
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
              href="/ai-roadmap"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 border-0 overflow-hidden h-full">
                <CardContent className="p-10 text-white">
                  <Shield className="w-12 h-12 mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">
                    Campus Safety First
                  </h3>
                  <p className="text-blue-100 leading-relaxed mb-6">
                    Our anonymous reporting system ensures every voice is heard
                    while protecting your identity. AI-powered analysis helps
                    administration respond faster and more effectively.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "100% Anonymous",
                      "AI Summarization",
                      "Real-time Tracking",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-blue-100"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 border-0 overflow-hidden h-full">
                <CardContent className="p-10 text-white">
                  <Users className="w-12 h-12 mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">
                    Peer Learning Network
                  </h3>
                  <p className="text-emerald-100 leading-relaxed mb-6">
                    Learn from seniors who&apos;ve been there. Real internship
                    experiences, genuine advice, and a supportive community to
                    help you succeed.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Verified Experiences",
                      "Company Insights",
                      "Skill Mapping",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-emerald-100"
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-12 md:p-16 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-8 text-blue-600" />
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Ready to Transform Your Campus Experience?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of students already using CampusConnect AI to
                  build safer campuses and brighter futures.
                </p>
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-10 py-6 text-lg shadow-xl shadow-blue-500/25"
                  >
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-800 dark:text-white">
                CampusConnect AI
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 CampusConnect AI. Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
