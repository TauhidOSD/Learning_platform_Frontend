"use client";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

const COLORS = ["#2E2A6B", "#1F6F5C", "#E8973D", "#A5A5AA"];

function Card({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default function DashboardOverviewPage() {
  const { user } = useAuthStore();
  const role = user?.role || "student";

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-overview", role],
    queryFn: async () => (await api.get(`/dashboard/${role}/overview`)).data,
    enabled: !!user,
  });

  if (isLoading) return <p className="text-sm text-muted">Loading your dashboard…</p>;

  if (role === "student") {
    return (
      <div>
        <h1 className="font-display text-2xl font-semibold">Welcome back, {user?.name.split(" ")[0]}</h1>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card label="Enrolled courses" value={data?.cards.totalCourses ?? 0} />
          <Card label="Completed" value={data?.cards.completed ?? 0} />
          <Card label="In progress" value={data?.cards.inProgress ?? 0} />
          <Card label="Avg. progress" value={`${data?.cards.avgProgress ?? 0}%`} />
        </div>
        <div className="card mt-6 p-5">
          <p className="text-sm font-semibold">Progress by course</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.progressByCourse || []}>
                <XAxis dataKey="course" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="progress" fill="#1F6F5C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  if (role === "instructor") {
    return (
      <div>
        <h1 className="font-display text-2xl font-semibold">Instructor overview</h1>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card label="My courses" value={data?.cards.totalCourses ?? 0} />
          <Card label="Total students" value={data?.cards.totalStudents ?? 0} />
          <Card label="Revenue" value={`$${data?.cards.totalRevenue ?? 0}`} />
          <Card label="Avg. rating" value={data?.cards.avgRating ?? 0} />
        </div>
        <div className="card mt-6 p-5">
          <p className="text-sm font-semibold">Students per course</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.enrollmentsByCourse || []}>
                <XAxis dataKey="course" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="students" fill="#2E2A6B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Platform overview</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card label="Total users" value={data?.cards.totalUsers ?? 0} />
        <Card label="Total courses" value={data?.cards.totalCourses ?? 0} />
        <Card label="Total enrollments" value={data?.cards.totalEnrollments ?? 0} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm font-semibold">Users by role</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data?.usersByRole || []} dataKey="count" nameKey="role" outerRadius={90} label>
                  {(data?.usersByRole || []).map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-5">
          <p className="text-sm font-semibold">Courses by category</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.coursesByCategory || []}>
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#E8973D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
