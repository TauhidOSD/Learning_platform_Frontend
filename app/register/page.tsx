"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerSchema, RegisterInput } from "@/lib/schemas";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "student" },
  });

  const onSubmit = async (values: RegisterInput) => {
    setServerError("");
    try {
      const { data } = await api.post("/auth/register", values);
      setAuth(data.user, data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Could not create your account. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-xl items-center justify-center px-5 py-16 lg:px-10">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-muted">Start with any free course in under a minute.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input {...register("name")} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-trail" />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
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
          <div>
            <label className="text-sm font-medium">I am joining as a</label>
            <select {...register("role")} className="mt-1 w-full rounded-xl border border-themed bg-transparent px-4 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-trail">
              <option value="student">Student — I want to learn</option>
              <option value="instructor">Instructor — I want to teach</option>
            </select>
          </div>
          {serverError && <p className="text-sm text-red-600">{serverError}</p>}
          <button disabled={isSubmitting} type="submit" className="w-full rounded-full bg-ink py-2.5 text-sm font-semibold text-white hover:bg-ink/90 disabled:opacity-60">
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-current opacity-20" /> or <span className="h-px flex-1 bg-current opacity-20" />
        </div>
        <button type="button" title="Social login is not wired to a real provider in this starter — see README" className="flex w-full items-center justify-center gap-2 rounded-full border border-themed py-2.5 text-sm font-medium opacity-60">
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account? <Link href="/login" className="font-semibold text-pine hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
