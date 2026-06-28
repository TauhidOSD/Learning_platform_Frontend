"use client";
import { useState, useEffect, useMemo, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import CourseCard, { CourseCardData } from "@/components/CourseCard";
import CourseCardSkeleton from "@/components/CourseCardSkeleton";

const categories = ["Programming", "Design", "Marketing", "Business"];
const levels = ["Beginner", "Intermediate", "Advanced"];

// ১. আপনার মূল পেজের লজিকটি আলাদা এই ফাংশনে থাকবে
function CoursesContent() {
  const params = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState(params.get("category") || "");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  // Debounce the search box so we don't fire a request on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => setPage(1), [debounced, category, level, sort]);

  const queryString = useMemo(() => {
    const sp = new URLSearchParams();
    if (debounced) sp.set("search", debounced);
    if (category) sp.set("category", category);
    if (level) sp.set("level", level);
    sp.set("sort", sort);
    sp.set("page", String(page));
    sp.set("limit", "8");
    return sp.toString();
  }, [debounced, category, level, sort, page]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses", queryString],
    queryFn: async () => (await api.get(`/courses?${queryString}`)).data,
  });

  return (
    <div className="mx-auto max-w-screen-xl px-5 py-12 lg:px-10">
      <h1 className="font-display text-3xl font-semibold">Explore courses</h1>
      <p className="mt-1 text-sm text-muted">Filter by category and level to find the right next track.</p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses…"
            className="w-full rounded-full border border-themed bg-transparent py-2.5 pl-9 pr-4 text-sm outline-none focus-visible:outline-2 focus-visible:outline-trail"
          />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-themed bg-transparent px-4 py-2.5 text-sm outline-none">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-full border border-themed bg-transparent px-4 py-2.5 text-sm outline-none">
          <option value="">All levels</option>
          {levels.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-themed bg-transparent px-4 py-2.5 text-sm outline-none">
          <option value="-createdAt">Newest</option>
          <option value="price">Price: low to high</option>
          <option value="-price">Price: high to low</option>
          <option value="-rating">Highest rated</option>
        </select>
      </div>

      {isError && <p className="mt-10 text-sm text-muted">Couldn't load courses — make sure the API server is running, then refresh.</p>}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <CourseCardSkeleton key={i} />)
          : (data?.courses as CourseCardData[])?.map((c) => <CourseCard key={c._id} course={c} />)}
      </div>

      {!isLoading && data?.courses?.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted">No courses match these filters yet — try clearing one.</p>
      )}

      {data?.pagination && data.pagination.pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: data.pagination.pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-full text-sm font-medium ${page === i + 1 ? "bg-ink text-white" : "border border-themed hover:bg-ink/5 dark:hover:bg-white/10"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ২. মূল এক্সপোর্ট পেজে Suspense বাউন্ডারি দিয়ে র্যাপ করে দেওয়া হলো
export default function CoursesPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-screen-xl px-5 py-12 lg:px-10 text-center text-sm text-muted">
        Loading courses platform...
      </div>
    }>
      <CoursesContent />
    </Suspense>
  );
}