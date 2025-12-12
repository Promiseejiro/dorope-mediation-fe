// app/dashboard/page.tsx - Student Version
"use client";

import AvailableExams from "@/components/pages/dashboard/student/AvailableExams";
import StudentStatsCards from "@/components/pages/dashboard/student/StudentStatsCards";
import ProgressTracking from "@/components/pages/dashboard/student/ProgressTracking";
import ExamHistory from "@/components/pages/dashboard/student/ExamHistory";
import StudentQuickActions from "@/components/pages/dashboard/student/StudentQuickActions";
import RecentResults from "@/components/pages/dashboard/student/RecentResults";

interface StudentDashboardPageProps {
  userData?: any;
}

export default function StudentDashboardPage({
  userData,
}: StudentDashboardPageProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {userData?.name}!
        </h1>
        <p className="text-gray-600">
          Track your progress, take exams, and view your results.
        </p>
      </div>

      {/* Stats Cards */}
      <StudentStatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Available Exams */}
          <AvailableExams />

          {/* Progress Tracking */}
          <ProgressTracking />

          {/* Exam History */}
          <ExamHistory />
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <StudentQuickActions />

          {/* Recent Results */}
          <RecentResults />
        </div>
      </div>
    </div>
  );
}
