const posts = [
  { title: "Why most coding courses don't transfer to the job", date: "Jun 2026", excerpt: "Syntax fluency isn't the same as engineering judgment — here's what actually closes that gap." },
  { title: "How we picked the first 8 Learnix tracks", date: "May 2026", excerpt: "We started from job postings, not trends. Here's the filter we used." },
  { title: "A study assistant that doesn't just answer — it asks back", date: "Apr 2026", excerpt: "Notes from designing Learnix's AI tutor to encourage thinking, not copy-paste answers." },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-semibold">Blog</h1>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {posts.map((p) => (
          <div key={p.title} className="card p-5">
            <p className="text-xs text-muted">{p.date}</p>
            <p className="mt-2 font-display text-lg font-semibold">{p.title}</p>
            <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
