
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Star, Calendar, Plus, Github, ExternalLink, Sparkles } from "lucide-react";
import ThreeDBackground from "@/components/ThreeDBackground";

// StatCard component for stats at the top
function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className={`flex items-center gap-3 bg-gray-800/80 rounded-lg px-5 py-4 shadow-md border border-gray-700 min-w-[160px]`}> 
      <span className={`p-2 rounded-full ${color} bg-opacity-20`}>{icon}</span>
      <div>
        <div className="text-xl font-bold leading-tight">{value}</div>
        <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

// Modal for adding a new hackathon
function AddHackathonModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (h: any) => void }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    award: "",
    description: "",
    github: "",
    external: "",
    date: "",
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({ ...form, id: Date.now() });
    onClose();
    setForm({ name: "", role: "", award: "", description: "", github: "", external: "", date: "" });
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gray-900 rounded-xl p-8 w-full max-w-lg shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Add Hackathon</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input required name="name" placeholder="Hackathon Name" className="bg-gray-800 rounded px-3 py-2" value={form.name} onChange={handleChange} />
          <input name="role" placeholder="Your Role (e.g. Developer)" className="bg-gray-800 rounded px-3 py-2" value={form.role} onChange={handleChange} />
          <input name="award" placeholder="Award (e.g. Winner, Finalist)" className="bg-gray-800 rounded px-3 py-2" value={form.award} onChange={handleChange} />
          <input name="date" placeholder="Date (e.g. Jan 2026)" className="bg-gray-800 rounded px-3 py-2" value={form.date} onChange={handleChange} />
          <input name="github" placeholder="GitHub Link (optional)" className="bg-gray-800 rounded px-3 py-2" value={form.github} onChange={handleChange} />
          <input name="external" placeholder="External Link (optional)" className="bg-gray-800 rounded px-3 py-2" value={form.external} onChange={handleChange} />
          <textarea name="description" placeholder="Description" className="bg-gray-800 rounded px-3 py-2 min-h-[60px]" value={form.description} onChange={handleChange} />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold">Add</button>
            <button type="button" className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// AI Insight (optional, can be enhanced)
function AIInsight({ hackathons }: { hackathons: any[] }) {
  if (!hackathons.length) return null;
  // Simple insight: most common role, most awards, most recent
  const roles = hackathons.map(h => h.role).filter(Boolean);
  const awards = hackathons.map(h => h.award).filter(Boolean);
  const mostCommonRole = roles.sort((a,b) => roles.filter(v=>v===a).length - roles.filter(v=>v===b).length).pop();
  const mostAwards = awards.sort((a,b) => awards.filter(v=>v===a).length - awards.filter(v=>v===b).length).pop();
  const recent = hackathons.slice().sort((a,b) => (b.date||"").localeCompare(a.date||""))[0];
  return (
    <div className="bg-gradient-to-r from-indigo-800/80 to-purple-800/80 rounded-lg p-4 mt-6 flex items-center gap-3 border border-indigo-700 shadow">
      <Sparkles className="text-yellow-300" />
      <div>
        <div className="font-semibold text-lg">AI Insight</div>
        <div className="text-sm text-gray-200 mt-1">
          {mostCommonRole && <span>Most frequent role: <b>{mostCommonRole}</b>. </span>}
          {mostAwards && <span>Most awards: <b>{mostAwards}</b>. </span>}
          {recent && <span>Most recent: <b>{recent.name}</b> ({recent.date || "N/A"}).</span>}
        </div>
      </div>
    </div>
  );
}

const initialHackathons = [
  {
    id: 1,
    name: "AI4Good 2025",
    role: "Team Lead",
    award: "Winner",
    description: "Built an AI-powered platform for social impact. Collaborated with a diverse team and won the grand prize.",
    github: "https://github.com/yourusername/ai4good2025",
    external: "",
    date: "Jan 2025",
  },
  {
    id: 2,
    name: "Campus Codefest 2024",
    role: "Developer",
    award: "Finalist",
    description: "Developed a campus event management app. Reached the finals and presented to industry judges.",
    github: "",
    external: "https://campuscodefest.com/projects/123",
    date: "Aug 2024",
  },
];

const HackathonPortfolioPage = () => {
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [showModal, setShowModal] = useState(false);

  // Stats
  const total = hackathons.length;
  const awards = hackathons.filter(h => h.award && h.award.toLowerCase() !== "participant").length;
  const roles = Array.from(new Set(hackathons.map(h => h.role).filter(Boolean)));

  function handleAdd(h: any) {
    setHackathons([h, ...hackathons]);
  }
  function handleDelete(id: number) {
    setHackathons(hackathons.filter(h => h.id !== id));
  }
  function handleEdit(id: number) {
    // For demo: just alert. Implement edit modal as needed.
    alert("Edit functionality coming soon!");
  }

  return (
    <div className="min-h-screen bg-transparent text-white relative">
      <ThreeDBackground />
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Hackathon <span className="text-amber-400">Portfolio</span></h1>
          <p className="text-white/40 text-lg max-w-2xl">Showcase your hackathon journey, achievements, and participation history. Add your hackathons, see your stats, and impress judges!</p>
        </header>

        {/* Stats */}
        <div className="flex gap-6 mb-8">
          <StatCard icon={<Trophy className="text-yellow-400" />} label="Total Hackathons" value={total} color="bg-yellow-900" />
          <StatCard icon={<Medal className="text-orange-400" />} label="Awards" value={awards} color="bg-orange-900" />
          <StatCard icon={<Star className="text-blue-400" />} label="Roles" value={roles.length} color="bg-blue-900" />
        </div>

        {/* Add Hackathon Button */}
        <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold mb-6">
          <Plus className="inline-block mr-2" /> Add Hackathon
        </button>
        <AddHackathonModal open={showModal} onClose={() => setShowModal(false)} onAdd={handleAdd} />

        {/* AI Insight */}
        <div className="mb-6">
          <AIInsight hackathons={hackathons} />
        </div>

        {/* Hackathon Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {hackathons.length === 0 && (
            <div className="text-gray-400 text-center py-12 col-span-2">No hackathons added yet. Click <b>Add Hackathon</b> to get started!</div>
          )}
          {hackathons.map(h => (
            <motion.div key={h.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-white/5 border-white/10 hover:bg-white/10 transition-all h-full rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black">{h.name}</h3>
                      <div className="flex items-center gap-2 text-white/40 text-sm mt-1">
                        <Calendar className="w-4 h-4" />
                        {h.date}
                      </div>
                    </div>
                    {h.award && h.award.toLowerCase() !== "participant" && (
                      <span className="ml-2 inline-flex items-center gap-1 bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded-full"><Trophy className="w-4 h-4" /> {h.award}</span>
                    )}
                    {h.role && (
                      <span className="ml-2 inline-flex items-center gap-1 bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full"><Star className="w-4 h-4" /> {h.role}</span>
                    )}
                  </div>
                  <div className="text-white/60 text-sm mb-2">{h.description}</div>
                  <div className="flex gap-2 mt-1">
                    {h.github && (
                      <a href={h.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-200 hover:text-white bg-gray-700 px-2 py-1 rounded text-xs"><Github className="w-4 h-4" /> GitHub</a>
                    )}
                    {h.external && (
                      <a href={h.external} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gray-200 hover:text-white bg-gray-700 px-2 py-1 rounded text-xs"><ExternalLink className="w-4 h-4" /> External</a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(h.id)} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded font-semibold text-sm">Edit</button>
                  <button onClick={() => handleDelete(h.id)} className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-semibold text-sm">Delete</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonPortfolioPage;
