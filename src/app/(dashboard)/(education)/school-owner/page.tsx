// app/dashboard/page.tsx - Super Admin Version
"use client";

import { useSession } from "next-auth/react";
import PlatformAnalytics from "@/components/pages/dashboard/school-owner/PlatformAnalytics";
import SuperAdminStatsCards from "@/components/pages/dashboard/school-owner/SuperAdminStatsCards";
import OrganizationManagement from "@/components/pages/dashboard/school-owner/OrganizationManagement";
import UserManagement from "@/components/pages/dashboard/school-owner/UserManagement";
import SuperAdminQuickActions from "@/components/pages/dashboard/school-owner/SuperAdminQuickActions";
import SystemHealth from "@/components/pages/dashboard/school-owner/SystemHealth";

export default function SuperAdminDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          System Administration Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor platform performance and manage all organizations.
        </p>
      </div>

      {/* Stats Cards */}
      <SuperAdminStatsCards />

      {/* Platform Analytics */}
      <PlatformAnalytics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Organization Management */}
          <OrganizationManagement />

          {/* User Management */}
          <UserManagement />
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <SuperAdminQuickActions />

          {/* System Health */}
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}
