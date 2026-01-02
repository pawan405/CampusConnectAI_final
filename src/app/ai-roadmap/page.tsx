"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Brain,
  MapPin,
  ArrowLeft,
  Sparkles,
  Target,
  BookOpen,
  Code,
  Briefcase,
  Trophy,
  ChevronRight,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoadmapStep {
  phase: string;
  title: string;
  duration: string;
  description: string;
  tasks: string[];
  resources: string[];
}

const generateRoadmap = (
  year: string,
  branch: string,
  interest: string
): RoadmapStep[] => {
  const roadmaps: Record<string, RoadmapStep[]> = {
    "software-engineering": [
      {
        phase: "Foundation",
        title: "Build Your Base",
        duration: "Month 1-2",
        description:
          "Master the fundamentals of programming and problem-solving",
        tasks: [
          "Complete a programming language course (Python/Java/C++)",
          "Solve 50 easy problems on LeetCode/HackerRank",
          "Learn Git and GitHub basics",
          "Build 2-3 small projects",
        ],
        resources: ["Codecademy", "freeCodeCamp", "CS50 Harvard", "LeetCode"],
      },
      {
        phase: "Core Skills",
        title: "DSA & System Design",
        duration: "Month 3-4",
        description:
          "Deep dive into Data Structures, Algorithms, and basic system design",
        tasks: [
          "Master arrays, linked lists, trees, and graphs",
          "Solve 100+ medium-level problems",
          "Learn basic system design concepts",
          "Participate in coding contests",
        ],
        resources: [
          "Striver's DSA Sheet",
          "NeetCode 150",
          "System Design Primer",
        ],
      },
      {
        phase: "Specialization",
        title: "Choose Your Path",
        duration: "Month 5-6",
        description: "Pick a specialization: Frontend, Backend, or Full Stack",
        tasks: [
          "Learn a framework (React/Node.js/Django)",
          "Build a full-stack project",
          "Contribute to open source",
          "Create a portfolio website",
        ],
        resources: ["React Docs", "Node.js Docs", "GitHub", "Vercel"],
      },
      {
        phase: "Interview Prep",
        title: "Land Your Dream Role",
        duration: "Month 7-8",
        description: "Prepare for technical interviews and apply strategically",
        tasks: [
          "Mock interviews on Pramp/Interviewing.io",
          "Review top 100 interview questions",
          "Prepare behavioral stories (STAR method)",
          "Apply to 50+ companies",
        ],
        resources: ["Pramp", "Blind 75", "Glassdoor", "LinkedIn"],
      },
    ],
    "data-science": [
      {
        phase: "Foundation",
        title: "Math & Statistics",
        duration: "Month 1-2",
        description: "Build strong mathematical foundations for data science",
        tasks: [
          "Linear Algebra fundamentals",
          "Statistics and Probability",
          "Python for Data Science",
          "NumPy and Pandas basics",
        ],
        resources: ["Khan Academy", "3Blue1Brown", "Kaggle Learn"],
      },
      {
        phase: "Core Skills",
        title: "Machine Learning",
        duration: "Month 3-4",
        description: "Master classical ML algorithms and techniques",
        tasks: [
          "Supervised Learning (Regression, Classification)",
          "Unsupervised Learning (Clustering, PCA)",
          "Complete 5 Kaggle competitions",
          "Scikit-learn mastery",
        ],
        resources: ["Andrew Ng's ML Course", "Kaggle", "Scikit-learn Docs"],
      },
      {
        phase: "Advanced",
        title: "Deep Learning & AI",
        duration: "Month 5-6",
        description: "Explore neural networks and advanced AI techniques",
        tasks: [
          "Neural Networks fundamentals",
          "TensorFlow/PyTorch proficiency",
          "Computer Vision or NLP project",
          "Deploy ML models",
        ],
        resources: ["Fast.ai", "Deep Learning Specialization", "HuggingFace"],
      },
      {
        phase: "Industry Ready",
        title: "Portfolio & Applications",
        duration: "Month 7-8",
        description: "Build impressive projects and prepare for DS interviews",
        tasks: [
          "Build 3 end-to-end projects",
          "Create data science blog",
          "Practice case studies",
          "Prepare for interviews",
        ],
        resources: ["Medium", "Towards Data Science", "Interview Query"],
      },
    ],
    "product-management": [
      {
        phase: "Foundation",
        title: "PM Fundamentals",
        duration: "Month 1-2",
        description: "Understand the role and core competencies of a PM",
        tasks: [
          "Read Cracking the PM Interview",
          "Understand product lifecycle",
          "Learn user research methods",
          "Study metrics and KPIs",
        ],
        resources: ["Cracking the PM Interview", "Product School", "Reforge"],
      },
      {
        phase: "Skills Building",
        title: "Technical & Analytical",
        duration: "Month 3-4",
        description: "Build technical literacy and analytical capabilities",
        tasks: [
          "Learn SQL for data analysis",
          "Understand basic engineering concepts",
          "A/B testing and experimentation",
          "Create PRDs and wireframes",
        ],
        resources: ["SQL Course", "Figma", "Mixpanel Academy"],
      },
      {
        phase: "Practice",
        title: "Case Studies & Projects",
        duration: "Month 5-6",
        description: "Apply knowledge through real-world scenarios",
        tasks: [
          "Practice 50+ PM case studies",
          "Create a side project (app/feature)",
          "Conduct user interviews",
          "Build product sense",
        ],
        resources: ["PM Exercises", "Product Buds", "Exponent"],
      },
      {
        phase: "Interview Prep",
        title: "Land PM Role",
        duration: "Month 7-8",
        description: "Master PM interviews and secure your role",
        tasks: [
          "Mock PM interviews",
          "Prepare execution questions",
          "Practice estimation problems",
          "Network with PMs",
        ],
        resources: ["Exponent", "Stellar Peers", "LinkedIn"],
      },
    ],
  };

  const key = interest.toLowerCase().replace(/\s+/g, "-");
  return roadmaps[key] || roadmaps["software-engineering"];
};

export default function AIRoadmapPage() {
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [interest, setInterest] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<RoadmapStep[] | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!year || !branch || !interest) return;

    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2500));

    const generatedRoadmap = generateRoadmap(year, branch, interest);
    setRoadmap(generatedRoadmap);
    setExpandedPhase(0);
    setIsGenerating(false);
  };

  const resetForm = () => {
    setYear("");
    setBranch("");
    setInterest("");
    setRoadmap(null);
    setExpandedPhase(null);
  };

  const phaseIcons = [Target, BookOpen, Code, Trophy];
  const phaseColors = [
    "from-cyan-500 to-blue-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
  ];

  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-900/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[100px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08080c]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white/60 hover:text-white hover:bg-white/[0.06]"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              </Link>
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent hidden sm:block">
                  CampusConnect AI
                </span>
              </Link>
            </div>
            <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 gap-1">
              <Sparkles className="w-3 h-3" /> AI Powered
            </Badge>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Personalized Career Guidance
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            AI Career{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Get a personalized career roadmap powered by AI. Enter your details
            and receive a structured path tailored to your goals and timeline.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!roadmap ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="bg-white/[0.02] border border-white/[0.06] shadow-xl">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2 text-white">
                    <Rocket className="w-6 h-6 text-emerald-400" />
                    Generate Your Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">
                      Year of Study *
                    </label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger className="h-12 bg-white/[0.02] border-white/[0.06] text-white">
                        <GraduationCap className="w-5 h-5 mr-2 text-white/40" />
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0c0c12] border-white/[0.06]">
                        <SelectItem value="1st-year">1st Year</SelectItem>
                        <SelectItem value="2nd-year">2nd Year</SelectItem>
                        <SelectItem value="3rd-year">3rd Year</SelectItem>
                        <SelectItem value="final-year">Final Year</SelectItem>
                        <SelectItem value="graduate">Graduate/PG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">
                      Branch/Major *
                    </label>
                    <Select value={branch} onValueChange={setBranch}>
                      <SelectTrigger className="h-12 bg-white/[0.02] border-white/[0.06] text-white">
                        <BookOpen className="w-5 h-5 mr-2 text-white/40" />
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0c0c12] border-white/[0.06]">
                        <SelectItem value="cse">
                          Computer Science & Engineering
                        </SelectItem>
                        <SelectItem value="it">
                          Information Technology
                        </SelectItem>
                        <SelectItem value="ece">
                          Electronics & Communication
                        </SelectItem>
                        <SelectItem value="ee">
                          Electrical Engineering
                        </SelectItem>
                        <SelectItem value="me">
                          Mechanical Engineering
                        </SelectItem>
                        <SelectItem value="mba">MBA/Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/60 mb-2 block">
                      Career Interest *
                    </label>
                    <Select value={interest} onValueChange={setInterest}>
                      <SelectTrigger className="h-12 bg-white/[0.02] border-white/[0.06] text-white">
                        <Target className="w-5 h-5 mr-2 text-white/40" />
                        <SelectValue placeholder="Select your career interest" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0c0c12] border-white/[0.06]">
                        <SelectItem value="software-engineering">
                          Software Engineering
                        </SelectItem>
                        <SelectItem value="data-science">
                          Data Science & ML
                        </SelectItem>
                        <SelectItem value="product-management">
                          Product Management
                        </SelectItem>
                        <SelectItem value="frontend">
                          Frontend Development
                        </SelectItem>
                        <SelectItem value="backend">
                          Backend Development
                        </SelectItem>
                        <SelectItem value="devops">DevOps & Cloud</SelectItem>
                        <SelectItem value="cybersecurity">
                          Cybersecurity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={!year || !branch || !interest || isGenerating}
                    className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-lg font-semibold shadow-lg shadow-emerald-500/25 gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating Your Roadmap...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate AI Roadmap
                      </>
                    )}
                  </Button>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="flex items-start gap-3 text-white/40 text-sm">
                      <Lightbulb className="w-5 h-5 shrink-0 text-amber-400" />
                      <p>
                        Our AI analyzes your profile and creates a customized
                        roadmap with actionable steps, timeline, and resources
                        to help you achieve your career goals.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    {interest
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                    Roadmap
                  </Badge>
                  <h2 className="text-2xl font-bold text-white">
                    Your Personalized 8-Month Journey
                  </h2>
                </div>
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="bg-white/[0.04] border-white/[0.06] text-white/70 hover:bg-white/[0.08]"
                >
                  Generate New
                </Button>
              </div>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500 hidden md:block" />

                <div className="space-y-6">
                  {roadmap.map((step, i) => {
                    const Icon = phaseIcons[i];
                    const isExpanded = expandedPhase === i;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card
                          className={`bg-white/[0.02] border border-white/[0.06] shadow-lg cursor-pointer transition-all duration-300 hover:border-white/[0.1] ${
                            isExpanded ? "ring-2 ring-emerald-500/30" : ""
                          }`}
                          onClick={() =>
                            setExpandedPhase(isExpanded ? null : i)
                          }
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start gap-6">
                              <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phaseColors[i]} flex items-center justify-center shrink-0 shadow-lg`}
                              >
                                <Icon className="w-8 h-8 text-white" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <Badge
                                      variant="secondary"
                                      className="bg-white/[0.04] text-white/60 border border-white/[0.06]"
                                    >
                                      {step.phase}
                                    </Badge>
                                    <span className="text-white/40 text-sm flex items-center gap-1">
                                      <Clock className="w-4 h-4" />{" "}
                                      {step.duration}
                                    </span>
                                  </div>
                                  <ChevronRight
                                    className={`w-5 h-5 text-white/30 transition-transform ${
                                      isExpanded ? "rotate-90" : ""
                                    }`}
                                  />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">
                                  {step.title}
                                </h3>
                                <p className="text-white/50">
                                  {step.description}
                                </p>

                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-6">
                                        <div>
                                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                                            Key Tasks
                                          </h4>
                                          <ul className="space-y-2">
                                            {step.tasks.map((task, j) => (
                                              <li
                                                key={j}
                                                className="flex items-start gap-3 text-white/60"
                                              >
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                                                {task}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-cyan-400" />
                                            Recommended Resources
                                          </h4>
                                          <div className="flex flex-wrap gap-2">
                                            {step.resources.map(
                                              (resource, j) => (
                                                <Badge
                                                  key={j}
                                                  variant="outline"
                                                  className="cursor-pointer border-white/[0.06] text-white/60 hover:bg-white/[0.04]"
                                                >
                                                  {resource}
                                                </Badge>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      Ready to Start Your Journey?
                    </h3>
                    <p className="text-white/60 mb-6 max-w-xl mx-auto">
                      Follow this roadmap consistently and you&apos;ll be
                      well-prepared to land your dream role. Remember,
                      consistency beats intensity!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400">
                        Save Roadmap
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/10 text-white/70 hover:bg-white/[0.04]"
                      >
                        Share with Friends
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
