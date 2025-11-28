// app/auth/verify/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";

interface VerifyFormData {
  otp: string;
}

const VerifyPage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const initialValues: VerifyFormData = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must contain only numbers")
      .required("OTP is required"),
  });

  const handleSubmit = async (values: VerifyFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Verifying OTP:", values.otp);

      // Redirect to success page after verification
      router.push("/auth/account-created");
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  const handleResendOtp = () => {
    setCountdown(60);
    setCanResend(false);
    // Add resend OTP logic here
    console.log("Resending OTP...");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-600">We've sent a 6-digit code to your email</p>
        <p className="text-gray-500 mt-1 font-medium text-primary">
          example@email.com
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Enter verification code
          </label>
          <OtpInput
            length={6}
            value={formik.values.otp}
            onChange={(value) => formik.setFieldValue("otp", value)}
            onBlur={() => formik.setFieldTouched("otp", true)}
            error={formik.errors.otp}
            touched={formik.touched.otp}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={formik.isSubmitting || formik.values.otp.length !== 6}
        >
          {formik.isSubmitting ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-primary hover:text-secondary font-medium"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-500">Resend in {countdown}s</span>
          )}
        </p>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-primary text-center">
          Check your email inbox and spam folder for the verification code.
        </p>
      </div>
    </div>
  );
};

export default VerifyPage;
