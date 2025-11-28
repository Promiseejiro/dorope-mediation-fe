"use client";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/common/Logo";

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <Logo changeOnScroll={false} />
        {/* <p className="mt-1 text-gray-600">Digital Assessment Platform</p> */}
      </div>
      <LoginForm />

      {/* <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-secondary"
            >
              Sign up
            </a>
          </p>
        </div> */}
    </>
  );
}
