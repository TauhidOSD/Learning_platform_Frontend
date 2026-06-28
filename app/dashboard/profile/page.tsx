"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/lib/api";

export default function ProfilePage() {
  const { user, setAuth } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [status, setStatus] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
    try {
      const { data } = await api.put("/dashboard/profile", { name, bio });
      const token = localStorage.getItem("token") || "";
      setAuth({ ...(user as any), ...data.user }, token);
      setStatus("Profile updated.");
    } catch {
      setStatus("Couldn't save changes — please try again.");
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="font-display text-2xl font-semibold">Your profile</h1>
      <form onSubmit={save} className="card mt-6 space-y-4 p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-lg font-semibold text-white">
            {user?.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-sm font-semibold">{user?.email}</p>
            <p className="text-xs capitalize text-muted">{user?.role} account</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" />
        </div>
        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none" placeholder="Tell other learners a bit about yourself…" />
        </div>
        {status && <p className="text-sm text-pine">{status}</p>}
        <button className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90">Save changes</button>
      </form>
    </div>
  );
}
