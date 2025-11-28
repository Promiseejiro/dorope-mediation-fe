// app/dashboard/page.tsx - Admin Version
"use client";

import { useSession } from "next-auth/react";
import SchoolOverview from "@/components/pages/dashboard/admin/SchoolOverview";
import AdminStatsCards from "@/components/pages/dashboard/admin/AdminStatsCards";
import AdminQuickActions from "@/components/pages/dashboard/admin/AdminQuickActions";
import RecentActivity from "@/components/pages/dashboard/RecentActivity";
import PendingApprovals from "@/components/pages/dashboard/admin/PendingApprovals";
import BillingOverview from "@/components/pages/dashboard/admin/BillingOverview";

export default function AdminDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          School Administration Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your school's operations, staff, and student performance.
        </p>
      </div>

      {/* Stats Cards */}
      <AdminStatsCards />

      {/* School Overview */}
      <SchoolOverview />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <AdminQuickActions />

          {/* Recent Activity */}
          <RecentActivity />
        </div>

        <div className="space-y-6">
          {/* Pending Approvals */}
          <PendingApprovals />

          {/* Billing Overview */}
          <BillingOverview />
        </div>
      </div>
    </div>
  );
}
