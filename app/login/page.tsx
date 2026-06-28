"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema, LoginInput } from "@/lib/schemas";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    setServerError("");
    try {
      const { data } = await api.post("/auth/login", values);
      setAuth(data.user, data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Could not log in. Please try again.");
    }
  };

  const fillDemo = (role: "student" | "instructor" | "admin") => {
    const creds = {
      student: { email: "student@learnix.dev", password: "Student123!" },
      instructor: { email: "instructor@learnix.dev", password: "Instructor123!" },
      admin: { email: "admin@learnix.dev", password: "Admin123!" },
    }[role];
    setValue("email", creds.email);
    setValue("password", creds.password);
  };

  return (
    <div className="mx-auto flex max-w-screen-xl items-center justify-center px-5 py-16 lg:px-10">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted">Log in to continue your learning path.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => fillDemo("student")} className="rounded-full border border-themed px-3 py-1 text-xs font-medium hover:bg-ink/5 dark:hover:bg-white/10">Demo: Student</button>
          <button type="button" onClick={() => fillDemo("instructor")} className="rounded-full border border-themed px-3 py-1 text-xs font-medium hover:bg-ink/5 dark:hover:bg-white/10">Demo: Instructor</button>
          <button type="button" onClick={() => fillDemo("admin")} className="rounded-full border border-themed px-3 py-1 text-xs font-medium hover:bg-ink/5 dark:hover:bg-white/10">Demo: Admin</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input {...register("email")} type="email" className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-trail" />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input {...register("password")} type="password" className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-trail" />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button disabled={isSubmitting} type="submit" className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-60">
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-current opacity-20" /> or <span className="h-px flex-1 bg-current opacity-20" />
        </div>
        <button type="button" title="Social login is not wired to a real provider in this starter — see README" className="flex w-full items-center justify-center gap-2 rounded-full border border-themed py-2.5 text-sm font-medium opacity-60">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted">
          No account? <Link href="/register" className="font-semibold text-pine hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
