// components/layout/DashboardLayoutClient.tsx
"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
  userRole: "admin" | "teacher" | "student" | "super-admin";
  userName?: string | null;
}

export default function DashboardLayoutClient({
  children,
  userRole,
  userName,
}: DashboardLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleNav = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar
        userRole={userRole}
        userName={userName}
        toggleNav={toggleNav}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <div className="ml-4 lg:ml-6">
                <h1 className="text-xl font-semibold text-gray-900">
                  {getDashboardTitle(userRole)}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <i className="fas fa-bell"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile with Mobile Sidebar Toggle */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* Mobile Sidebar Toggle - Now in header */}
                  <button
                    onClick={toggleNav}
                    className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <i className="fas fa-bars text-lg"></i>
                  </button>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {userName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function getDashboardTitle(role: string): string {
  const titles = {
    admin: "School Administration Dashboard",
    teacher: "Teacher Dashboard",
    student: "Student Dashboard",
    "super-admin": "System Administration Dashboard",
  };
  return titles[role as keyof typeof titles] || "Dashboard";
}
