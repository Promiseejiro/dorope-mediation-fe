// app/(auth)/register/page.tsx
"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/common/Logo";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <Logo changeOnScroll={false} />
        {/* <p className="mt-1 text-gray-600">Digital Assessment Platform</p> */}
      </div>
      <RegisterForm />
    </>
  );
}
