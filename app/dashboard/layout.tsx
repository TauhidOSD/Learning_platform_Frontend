"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) router.replace("/login");
  }, [hydrated, user, router]);

  if (!hydrated) return <div className="px-5 py-16 text-sm text-muted">Loading…</div>;
  if (!user) return null;

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col lg:flex-row">
      <DashboardSidebar />
      <div className="flex-1 p-5 lg:p-8">{children}</div>
    </div>
  );
}
