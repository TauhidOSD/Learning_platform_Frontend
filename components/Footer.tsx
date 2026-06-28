import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "Explore courses" },
      { href: "/courses?category=Programming", label: "Programming" },
      { href: "/courses?category=Design", label: "Design" },
      { href: "/courses?category=Business", label: "Business" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/help", label: "Help & support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy & terms" },
      { href: "/login", label: "Log in" },
      { href: "/register", label: "Create account" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-themed surface">
      <div className="mx-auto max-w-screen-xl px-5 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="font-display text-xl font-semibold">Learn<span className="text-trail">ix</span></Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Job-ready skills in programming, design, marketing, and business — taught by people who build for a living.
            </p>
            <div className="mt-5 flex gap-3">
              <a href="https://github.com" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full border border-themed hover:text-trail"><Github size={16} /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-themed hover:text-trail"><Linkedin size={16} /></a>
              <a href="https://twitter.com" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border border-themed hover:text-trail"><Twitter size={16} /></a>
              <a href="mailto:hello@learnix.dev" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full border border-themed hover:text-trail"><Mail size={16} /></a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="text-sm text-muted hover:text-trail">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-themed pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Learnix. All rights reserved.</p>
          <p>123 Learning Lane, Dhaka, Bangladesh · +880 1XXX-XXXXXX</p>
        </div>
      </div>
    </footer>
  );
}
