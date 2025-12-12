import Logo from "@/components/common/Logo";
import AuthHeader from "@/components/layout/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <AuthHeader />
      <div className="max-w-lg mx-auto w-full">{children}</div>
    </div>
  );
}
