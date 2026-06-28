"use client";
import Link from "next/link";
import { ArrowRight, Code2, Palette, Megaphone, Briefcase } from "lucide-react";
import FeaturedCourses from "@/components/FeaturedCourses";

const categories = [
  { icon: Code2, name: "Programming", count: "120+ lessons", href: "/courses?category=Programming" },
  { icon: Palette, name: "Design", count: "60+ lessons", href: "/courses?category=Design" },
  { icon: Megaphone, name: "Marketing", count: "40+ lessons", href: "/courses?category=Marketing" },
  { icon: Briefcase, name: "Business", count: "55+ lessons", href: "/courses?category=Business" },
];

const steps = [
  { step: "Pick a track", text: "Choose a course based on the skill you need next, not a generic syllabus." },
  { step: "Learn by building", text: "Every module ends in a real project you can show, not just a quiz score." },
  { step: "Ask as you go", text: "The study assistant is there at 2am when your instructor isn't." },
  { step: "Prove it", text: "Finish with a portfolio piece and a course rating you actually earned." },
];

const testimonials = [
  { name: "Nusrat J.", role: "Frontend Developer", quote: "I went from copy-pasting React snippets to actually understanding why my state updates were breaking." },
  { name: "Tanvir A.", role: "Marketing Analyst", quote: "The analytics course replaced three vague YouTube playlists I'd been bouncing between for months." },
  { name: "Priya S.", role: "Product Designer", quote: "The Figma course's auto-layout section alone saved me hours every week on handoff." },
];

const faqs = [
  { q: "Do I need any prior experience?", a: "Most tracks start from Beginner level and clearly label prerequisites on each course page." },
  { q: "Are the courses self-paced?", a: "Yes — enroll any time and track your own progress from your dashboard." },
  { q: "Can I get a refund?", a: "Free courses have no charge; paid courses can be refunded within 7 days, see our Privacy & Terms page." },
  { q: "How does the study assistant work?", a: "Once you're logged in, a chat icon in the corner lets you ask questions about anything you're studying." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-themed surface md:min-h-[68vh]">
        <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-pine">For people who learn by doing</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] sm:text-5xl">
              Skills that hold up <span className="text-trail">outside the course.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted">
              Learnix tracks are built and taught by working practitioners — engineers, designers, and marketers who ship for a living, not just lecture.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/courses" className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90">
                Explore courses <ArrowRight size={16} />
              </Link>
              <Link href="/register" className="rounded-full border border-themed px-6 py-3 text-sm font-semibold hover:bg-ink/5 dark:hover:bg-white/10">
                Start free
              </Link>
            </div>
          </div>

          {/* Signature element: a dotted trail connecting learning milestones */}
          <div className="relative hidden lg:block">
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your path, mapped</p>
              <div className="mt-6 space-y-0">
                {["Pick a track", "Build a project", "Get reviewed", "Land the outcome"].map((label, i) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pine text-xs font-bold text-white">{i + 1}</span>
                      {i < 3 && <div className="trail-line my-1 h-8 w-[2px]" style={{ writingMode: "vertical-lr" }} />}
                    </div>
                    <p className="py-2 text-sm font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-themed">
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 px-5 py-10 sm:grid-cols-4 lg:px-10">
          {[["8", "active tracks"], ["3", "skill categories"], ["100%", "project-based"], ["24/7", "AI study help"]].map(([num, label]) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl font-semibold text-ink dark:text-white">{num}</p>
              <p className="mt-1 text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
        <h2 className="font-display text-2xl font-semibold">Browse by category</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.name} href={c.href} className="card flex items-center gap-4 p-5 hover:border-trail">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink/5 text-ink dark:bg-white/10 dark:text-white">
                <c.icon size={20} />
              </span>
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-muted">{c.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="border-y border-themed surface">
        <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold">Top-rated this month</h2>
            <Link href="/courses" className="text-sm font-semibold text-pine hover:underline">View all →</Link>
          </div>
          <div className="mt-8">
            <FeaturedCourses />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
        <h2 className="font-display text-2xl font-semibold">How a track actually works</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="card p-5">
              <span className="font-mono text-xs text-trail">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-semibold">{s.step}</p>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-themed surface">
        <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
          <h2 className="font-display text-2xl font-semibold">What learners say</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6">
                <p className="text-sm text-muted">"{t.quote}"</p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
        <h2 className="font-display text-2xl font-semibold">Frequently asked</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="card p-5">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-1 text-sm text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-screen-xl px-5 py-16 text-center text-white lg:px-10">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">Get one practical tip a week</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">No course pitches — just one thing worth trying in your next project.</p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="you@email.com" className="flex-1 rounded-full px-5 py-3 text-sm text-charcoal outline-none" />
            <button type="submit" className="rounded-full bg-trail px-6 py-3 text-sm font-semibold text-charcoal hover:opacity-90">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
