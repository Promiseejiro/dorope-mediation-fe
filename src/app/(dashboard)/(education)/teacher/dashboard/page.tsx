"use client";

import AnimatedModalLayout from "@/components/layout/animatedModalLayout";
import PendingMarking from "@/components/pages/dashboard/teacher/PendingMarking";
import RecentClasses from "@/components/pages/dashboard/teacher/RecentClasses";
import StudentPerformance from "@/components/pages/dashboard/teacher/StudentPerformance";
import TeacherQuickActions from "@/components/pages/dashboard/teacher/TeacherQuickActions";
import TeacherStatsCards from "@/components/pages/dashboard/teacher/TeacherStatsCards";
import UpcomingExams from "@/components/pages/dashboard/UpcomingExams";
import { useSession } from "next-auth/react";

export default function TeacherDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-600">
          Manage your classes, create exams, and track student performance.
        </p>
      </div>

      <TeacherStatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TeacherQuickActions />

          <RecentClasses />

          <StudentPerformance />
        </div>

        <div className="space-y-6">
          <PendingMarking />

          <UpcomingExams />
        </div>
      </div>

      {/* <AnimatedModalLayout  children={<div> </div>} /> */}
    </div>
  );
}
