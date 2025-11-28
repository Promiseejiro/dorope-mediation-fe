"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";
import AnimatedSuccessCheck from "@/components/ui/SuccessSvg";

const PasswordResetSuccessPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Success Icon */}
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <AnimatedSuccessCheck />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Password Reset Successfully!
      </h2>

      <p className="text-gray-600 mb-8">
        Your password has been reset successfully. You can now login with your
        new password.
      </p>

      <div className="space-y-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push("/auth/login")}
        >
          Login Now
        </Button>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Having trouble?
          <Link
            href="/contact"
            className="text-primary hover:text-secondary font-medium"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PasswordResetSuccessPage;
