"use client";
import AuthHeader from "@/components/layout/AuthHeader";
import Loader from "@/components/ui/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(status);
  useEffect(() => {
    if (status === "authenticated") {
    }
  }, [status, session]);
  return (
    <>
      {status === "authenticated" ? (
        <>{children}</>
      ) : status === "loading" ? (
        <Loader fullPage />
      ) : (
        router.push("/login")
      )}
      <AuthHeader />
    </>
  );
}
