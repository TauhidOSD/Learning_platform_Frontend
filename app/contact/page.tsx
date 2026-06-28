"use client";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-screen-xl px-5 py-16 lg:px-10">
      <h1 className="font-display text-3xl font-semibold">Contact us</h1>
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="card space-y-4 p-6">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input required className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea required rows={4} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
          </div>
          <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white">Send message</button>
          {sent && <p className="text-sm text-pine">Thanks — we'll reply within 1–2 business days.</p>}
        </form>
        <div className="space-y-4">
          <p className="flex items-center gap-3 text-sm"><MapPin size={16} className="text-pine" /> 123 Learning Lane, Dhaka, Bangladesh</p>
          <p className="flex items-center gap-3 text-sm"><Mail size={16} className="text-pine" /> hello@learnix.dev</p>
          <p className="flex items-center gap-3 text-sm"><Phone size={16} className="text-pine" /> +880 1XXX-XXXXXX</p>
        </div>
      </div>
    </div>
  );
}
