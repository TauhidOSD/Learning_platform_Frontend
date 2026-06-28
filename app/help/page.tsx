const items = [
  { q: "How do I enroll in a course?", a: "Open any course page and select Enroll now. You'll need a free student account." },
  { q: "How do I become an instructor?", a: "Register with the instructor role, then use Create course in your dashboard sidebar." },
  { q: "Where do I see my progress?", a: "Your dashboard overview shows progress per course and overall completion." },
  { q: "How does the AI study assistant work?", a: "Click the chat icon in the bottom-right corner once you're logged in to ask about anything you're studying." },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-semibold">Help & support</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {items.map((i) => (
          <div key={i.q} className="card p-5">
            <p className="font-semibold">{i.q}</p>
            <p className="mt-1 text-sm text-muted">{i.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">Still stuck? <a href="/contact" className="font-semibold text-pine hover:underline">Contact our team</a>.</p>
    </div>
  );
}
