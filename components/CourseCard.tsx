import Link from "next/link";
import Image from "next/image";
import { Star, Clock } from "lucide-react";

export interface CourseCardData {
  _id: string;
  title: string;
  shortDescription: string;
  thumbnailUrl: string;
  category: string;
  level: string;
  price: number;
  rating: number;
  ratingCount: number;
  durationHours: number;
}

export default function CourseCard({ course }: { course: CourseCardData }) {
  return (
    <div className="card flex h-full w-full flex-col overflow-hidden">
      <div className="relative h-40 w-full shrink-0">
        <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" unoptimized />
        <span className="absolute left-3 top-3 rounded-full bg-charcoal/80 px-2.5 py-1 text-xs font-medium text-white">
          {course.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-muted">{course.shortDescription}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1"><Star size={13} className="fill-trail text-trail" /> {course.rating.toFixed(1)} ({course.ratingCount})</span>
          <span className="flex items-center gap-1"><Clock size={13} /> {course.durationHours}h</span>
          <span>{course.level}</span>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-sm font-semibold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
          <Link href={`/courses/${course._id}`} className="rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white hover:bg-ink/90">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
