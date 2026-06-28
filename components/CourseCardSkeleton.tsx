export default function CourseCardSkeleton() {
  return (
    <div className="card h-full w-full animate-pulse overflow-hidden">
      <div className="h-40 w-full bg-ink/10 dark:bg-white/10" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-ink/10 dark:bg-white/10" />
        <div className="h-3 w-full rounded bg-ink/10 dark:bg-white/10" />
        <div className="h-3 w-2/3 rounded bg-ink/10 dark:bg-white/10" />
        <div className="mt-4 flex justify-between">
          <div className="h-4 w-10 rounded bg-ink/10 dark:bg-white/10" />
          <div className="h-7 w-20 rounded-full bg-ink/10 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}
