"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import CourseCard, { CourseCardData } from "./CourseCard";
import CourseCardSkeleton from "./CourseCardSkeleton";

export default function FeaturedCourses() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: async () => (await api.get("/courses?limit=4&sort=-rating")).data,
  });

  if (isError) {
    return (
      <p className="text-sm text-muted">
        Couldn't load courses right now — make sure the API server is running and try refreshing.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)
        : (data?.courses as CourseCardData[])?.map((c) => <CourseCard key={c._id} course={c} />)}
    </div>
  );
}
