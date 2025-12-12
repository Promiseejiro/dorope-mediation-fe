"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";

interface DashboardSidebarProps {
  userRole: "admin" | "teacher" | "student" | "super-admin";
  userName?: string | null;
  toggleNav: () => void;
  sidebarOpen: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userRole,
  userName,
  toggleNav,
  sidebarOpen,
}) => {
  const pathname = usePathname();

  const navigationItems = {
    admin: [
      { name: "Dashboard", href: "/dashboard", icon: "fas fa-chart-pie" },
      {
        name: "Organizations",
        href: "/organizations",
        icon: "fas fa-building",
      },
      {
        name: "Teachers",
        href: "/teachers",
        icon: "fas fa-chalkboard-teacher",
      },
      {
        name: "Students",
        href: "/students",
        icon: "fas fa-user-graduate",
      },
      { name: "Exams", href: "/dashboard/exams", icon: "fas fa-file-alt" },
      {
        name: "Question Bank",
        href: "/questions",
        icon: "fas fa-database",
      },
      { name: "Reports", href: "/reports", icon: "fas fa-chart-bar" },
      { name: "Settings", href: "/dashboard/settings", icon: "fas fa-cog" },
    ],
    teacher: [
      {
        name: "Dashboard",
        href: "/teacher/dashboard",
        icon: "fas fa-chart-pie",
      },
      { name: "My Classes", href: "/teacher/classes", icon: "fas fa-users" },
      {
        name: "Question Bank",
        href: "/teacher/questions",
        icon: "fas fa-database",
      },
      { name: "Exams", href: "/teacher/exams", icon: "fas fa-file-alt" },
      {
        name: "Marking",
        href: "/teacher/marking",
        icon: "fas fa-check-circle",
      },
      { name: "Reports", href: "/teacher/reports", icon: "fas fa-chart-bar" },
    ],
    student: [
      {
        name: "Dashboard",
        href: "/student/dashboard",
        icon: "fas fa-chart-pie",
      },
      {
        name: "Available Exams",
        href: "/student/available-exams",
        icon: "fas fa-file-alt",
      },
      { name: "My Results", href: "/student/my-results", icon: "fas fa-award" },
      { name: "Profile", href: "/student/profile", icon: "fas fa-user" },
    ],
    "super-admin": [
      { name: "Dashboard", href: "/dashboard", icon: "fas fa-chart-pie" },
      {
        name: "Organizations",
        href: "/organizations",
        icon: "fas fa-building",
      },
      { name: "System Users", href: "/users", icon: "fas fa-users" },
      {
        name: "Platform Analytics",
        href: "/analytics",
        icon: "fas fa-chart-line",
      },
      {
        name: "System Settings",
        href: "/system-settings",
        icon: "fas fa-cogs",
      },
    ],
  };

  const currentNavItems = navigationItems[userRole] || navigationItems.student;

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Logo
              changeOnScroll={false}
              iconSize="sm"
              textSize="xl"
              hideText={false}
            />
            <button
              onClick={toggleNav}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => toggleNav()}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActiveLink(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <i className={`${item.icon} w-5 mr-3`}></i>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {userName?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {userName || "User"}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Sign out"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleNav}
        ></div>
      )}
    </>
  );
};

export default DashboardSidebar;
