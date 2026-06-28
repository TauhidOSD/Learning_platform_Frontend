export default function AboutPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-semibold">About Learnix</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Learnix started from a simple frustration: most online courses teach syntax, not judgment. We build tracks with working
        engineers, designers, and marketers so every lesson maps to a decision you'll actually face on the job.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          ["Practitioner-built", "Every course is written and taught by someone currently doing the job, not a generic curriculum writer."],
          ["Project over theory", "Each module ends in something you build, not just a quiz you can guess your way through."],
          ["Help when you're stuck", "Our AI study assistant is available any time you're logged in, not just during office hours."],
        ].map(([title, body]) => (
          <div key={title} className="card p-5">
            <p className="font-semibold">{title}</p>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
