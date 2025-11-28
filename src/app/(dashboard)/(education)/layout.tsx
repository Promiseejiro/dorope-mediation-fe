import DashboardLayoutClient from "@/components/layout/DashboardLayoutClient";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  const userRole =
    (session?.user?.role as "admin" | "teacher" | "student" | "super-admin") ||
    "student";

  return (
    <DashboardLayoutClient userRole={userRole} userName={session?.user?.name}>
      {children}
    </DashboardLayoutClient>
  );
}
