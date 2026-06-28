"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Star, Clock, BarChart3, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import CourseCard from "@/components/CourseCard";

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const qc = useQueryClient();
  const [enrollMsg, setEnrollMsg] = useState("");
  const [review, setReview] = useState({ rating: 5, comment: "" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => (await api.get(`/courses/${id}`)).data,
  });

  const enroll = useMutation({
    mutationFn: async () => (await api.post(`/courses/${id}/enroll`)).data,
    onSuccess: () => setEnrollMsg("You're enrolled — find this course in your dashboard."),
    onError: (err: any) => setEnrollMsg(err.response?.data?.message || "Could not enroll right now."),
  });

  const submitReview = useMutation({
    mutationFn: async () => (await api.post(`/courses/${id}/reviews`, review)).data,
    onSuccess: () => {
      setReview({ rating: 5, comment: "" });
      qc.invalidateQueries({ queryKey: ["course", id] });
    },
  });

  if (isLoading) return <div className="mx-auto max-w-screen-xl px-5 py-16 text-sm text-muted lg:px-10">Loading course…</div>;
  if (isError || !data?.course) return <div className="mx-auto max-w-screen-xl px-5 py-16 text-sm text-muted lg:px-10">Course not found, or the API server isn't running.</div>;

  const { course, reviews, related } = data;

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-12 lg:px-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="rounded-full bg-ink/10 px-3 py-1 text-xs font-medium dark:bg-white/10">{course.category} · {course.level}</span>
          <h1 className="mt-3 font-display text-3xl font-semibold">{course.title}</h1>
          <p className="mt-2 text-muted">{course.shortDescription}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1"><Star size={14} className="fill-trail text-trail" /> {course.rating.toFixed(1)} ({course.ratingCount} reviews)</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {course.durationHours} hours</span>
            <span className="flex items-center gap-1"><BarChart3 size={14} /> {course.level}</span>
          </div>

          <div className="relative mt-6 h-72 w-full overflow-hidden rounded-card">
            <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" unoptimized />
          </div>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Overview</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">{course.overview}</p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Curriculum</h2>
            <ul className="mt-3 divide-y divide-themed border-t border-themed">
              {course.curriculum?.map((c: any, i: number) => (
                <li key={i} className="flex items-center justify-between py-3 text-sm">
                  <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-pine" /> {c.title}</span>
                  <span className="text-muted">{c.durationMinutes} min</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Reviews ({reviews?.length || 0})</h2>
            <div className="mt-4 space-y-4">
              {reviews?.map((r: any) => (
                <div key={r._id} className="card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{r.user?.name}</p>
                    <span className="flex items-center gap-1 text-xs"><Star size={12} className="fill-trail text-trail" /> {r.rating}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{r.comment}</p>
                </div>
              ))}
              {reviews?.length === 0 && <p className="text-sm text-muted">No reviews yet — be the first to enroll and leave one.</p>}
            </div>

            {user && (
              <form onSubmit={(e) => { e.preventDefault(); submitReview.mutate(); }} className="card mt-5 space-y-3 p-4">
                <p className="text-sm font-semibold">Leave a review</p>
                <select value={review.rating} onChange={(e) => setReview((r) => ({ ...r, rating: Number(e.target.value) }))} className="rounded-lg border border-themed bg-transparent px-3 py-1.5 text-sm">
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
                </select>
                <textarea
                  required
                  value={review.comment}
                  onChange={(e) => setReview((r) => ({ ...r, comment: e.target.value }))}
                  placeholder="What did you think of this course?"
                  className="w-full rounded-xl border border-themed bg-transparent px-3 py-2 text-sm outline-none"
                  rows={3}
                />
                <button disabled={submitReview.isPending} className="rounded-full bg-ink px-5 py-2 text-xs font-semibold text-white">
                  {submitReview.isPending ? "Posting…" : "Post review"}
                </button>
              </form>
            )}
          </section>
        </div>

        <aside className="card h-fit p-6 lg:sticky lg:top-24">
          <p className="font-mono text-2xl font-semibold">{course.price === 0 ? "Free" : `$${course.price}`}</p>
          {!user ? (
            <p className="mt-4 text-sm text-muted">Log in to enroll in this course.</p>
          ) : user.role === "student" ? (
            <button onClick={() => enroll.mutate()} disabled={enroll.isPending} className="mt-4 w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-60">
              {enroll.isPending ? "Enrolling…" : "Enroll now"}
            </button>
          ) : (
            <p className="mt-4 text-sm text-muted">Only student accounts can enroll.</p>
          )}
          {enrollMsg && <p className="mt-3 text-xs text-pine">{enrollMsg}</p>}

          <div className="mt-6 border-t border-themed pt-4">
            <p className="text-xs uppercase tracking-wide text-muted">Instructor</p>
            <p className="mt-1 text-sm font-semibold">{course.instructor?.name}</p>
            {course.instructor?.bio && <p className="mt-1 text-xs text-muted">{course.instructor.bio}</p>}
          </div>
        </aside>
      </div>

      {related?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold">Related courses</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((c: any) => <CourseCard key={c._id} course={c} />)}
          </div>
        </section>
      )}
    </div>
  );
}
