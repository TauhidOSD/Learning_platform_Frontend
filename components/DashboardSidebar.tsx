"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, BookOpen, PlusCircle, Users, BarChart2, GraduationCap } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const linksByRole: Record<string, { href: string; label: string; icon: any }[]> = {
  student: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/courses", label: "Browse courses", icon: BookOpen },
  ],
  instructor: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/instructor/new-course", label: "Create course", icon: PlusCircle },
    { href: "/courses", label: "My courses", icon: BookOpen },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/help", label: "Help", icon: GraduationCap },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/courses", label: "All courses", icon: BookOpen },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/help", label: "Help", icon: GraduationCap },
    { href: "/about", label: "Reports", icon: BarChart2 },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const links = linksByRole[user?.role || "student"];

  return (
    <aside className="w-full shrink-0 border-r border-themed lg:w-60">
      <nav className="flex gap-2 overflow-x-auto p-4 lg:flex-col lg:gap-1">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${pathname === l.href ? "bg-ink text-white" : "hover:bg-ink/5 dark:hover:bg-white/10"}`}
          >
            <l.icon size={16} /> {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
