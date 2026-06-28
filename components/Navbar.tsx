"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LayoutDashboard, User, LogOut, Settings } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import ThemeToggle from "./ThemeToggle";

const loggedOutLinks = [
  { href: "/courses", label: "Explore Courses" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const loggedInExtra = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/help", label: "Help" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const links = user ? [...loggedOutLinks, ...loggedInExtra] : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-themed surface backdrop-blur supports-[backdrop-filter]:bg-opacity-90">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-3 lg:px-10">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Learn<span className="text-trail">ix</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-trail ${pathname === l.href ? "text-trail" : "text-current"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 rounded-full border border-themed px-3 py-1.5 text-sm font-medium"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-xs font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name.split(" ")[0]}
                <ChevronDown size={14} />
              </button>
              {profileOpen && (
                <div className="card absolute right-0 mt-2 w-52 overflow-hidden p-1.5" onMouseLeave={() => setProfileOpen(false)}>
                  <Link href="/dashboard/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-ink/5 dark:hover:bg-white/10">
                    <User size={15} /> Profile
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-ink/5 dark:hover:bg-white/10">
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-ink/5 dark:hover:bg-white/10">
                    <Settings size={15} /> Settings
                  </Link>
                  <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40">
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-trail">Log in</Link>
              <Link href="/register" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink/90">
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-themed px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium">
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between">
              <ThemeToggle />
              {user ? (
                <button onClick={logout} className="text-sm font-semibold text-red-600">Log out</button>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" className="text-sm font-medium">Log in</Link>
                  <Link href="/register" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Get started</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
