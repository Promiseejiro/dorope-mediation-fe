// app/auth/account-created/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Link from "next/link";
import AnimatedSuccessCheck from "@/components/ui/SuccessSvg";

const AccountCreatedPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <AnimatedSuccessCheck />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Account Created Successfully!
      </h2>

      <p className="text-gray-600 mb-8">
        Your account has been verified and is ready to use. You can now access
        all features of EduAssess.
      </p>

      <div className="space-y-4">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => router.push("/dashboard")}
        >
          Proceed to Login
        </Button>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Need help?{" "}
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

export default AccountCreatedPage;
