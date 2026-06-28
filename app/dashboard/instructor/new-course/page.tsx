"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { api } from "@/lib/api";

export default function NewCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", shortDescription: "", overview: "", category: "Programming", level: "Beginner", price: 0, durationHours: 5,
    thumbnailUrl: "https://picsum.photos/seed/new-course/640/400",
  });
  const [topics, setTopics] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!form.title || !topics) {
      setError("Add a course title and a few topics first, then generate.");
      return;
    }
    setError("");
    setGenerating(true);
    try {
      const { data } = await api.post("/ai/generate-description", { title: form.title, topics });
      setForm((f) => ({ ...f, shortDescription: data.shortDescription || f.shortDescription, overview: data.overview || f.overview }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Couldn't generate a description — you can write one manually below.");
    } finally {
      setGenerating(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/courses", { ...form, price: Number(form.price), durationHours: Number(form.durationHours), curriculum: [] });
      router.push("/courses");
    } catch (err: any) {
      setError(err.response?.data?.message || "Couldn't create the course.");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">Create a new course</h1>
      <p className="mt-1 text-sm text-muted">Fill in the basics, then use the AI assistant to draft your description.</p>

      <form onSubmit={submit} className="card mt-6 space-y-4 p-6">
        <div>
          <label className="text-sm font-medium">Course title</label>
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
        </div>

        <div className="card border-dashed p-4">
          <p className="flex items-center gap-2 text-sm font-semibold"><Sparkles size={15} className="text-trail" /> AI description generator</p>
          <p className="mt-1 text-xs text-muted">List the key topics, then generate a short description and overview.</p>
          <textarea value={topics} onChange={(e) => setTopics(e.target.value)} rows={2} placeholder="e.g. component composition, custom hooks, form validation" className="mt-2 w-full rounded-xl border border-themed bg-transparent px-3 py-2 text-sm outline-none" />
          <button type="button" onClick={generate} disabled={generating} className="mt-2 rounded-full bg-trail px-4 py-1.5 text-xs font-semibold text-charcoal disabled:opacity-60">
            {generating ? "Generating…" : "Generate with AI"}
          </button>
        </div>

        <div>
          <label className="text-sm font-medium">Short description</label>
          <input required value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium">Overview</label>
          <textarea required value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} rows={4} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none">
              {["Programming", "Design", "Marketing", "Business"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Level</label>
            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none">
              {["Beginner", "Intermediate", "Advanced"].map((l) => <option key={l}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Price (USD, 0 = free)</label>
            <input type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium">Duration (hours)</label>
            <input type="number" min={1} value={form.durationHours} onChange={(e) => setForm({ ...form, durationHours: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90">Publish course</button>
      </form>
    </div>
  );
}
