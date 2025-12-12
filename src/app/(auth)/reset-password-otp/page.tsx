// app/reset-password-otp/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";
import { VerifyResetPasswordFormData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { toastCustom } from "@/utils/toast";
import {
  ResendResetPassword,
  verifyResetPassword,
} from "@/request/authRequest";
import { useAuthStore } from "@/store/authStore";

const ResetPasswordOtpPage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { storedEmail, setstoredEmail } = useAuthStore();

  useEffect(() => {
    if (!storedEmail) {
      router.push("/forgot-password");
    }
  }, [storedEmail, router]);

  if (!storedEmail) {
    return null;
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const initialValues: VerifyResetPasswordFormData = {
    otp: "",
    email: storedEmail,
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must contain only numbers")
      .required("OTP is required"),
  });

  const mutation = useMutation({
    mutationFn: (data: VerifyResetPasswordFormData) =>
      verifyResetPassword(data),
    onSuccess: (data, formdata) => {
      router.push("/new-password");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const resetMutation = useMutation({
    mutationFn: (email: string) => ResendResetPassword(email),
    onSuccess: (data, formdata) => {},
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const handleResendOtp = () => {
    setCountdown(60);
    setCanResend(false);
    resetMutation.mutate(storedEmail);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data: VerifyResetPasswordFormData) => {
      console.log(data.email);
      mutation.mutate(data);
      setstoredEmail(data.email);
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Enter Verification Code
        </h2>
        <p className="text-gray-600">
          We sent a 6-digit code to your email to reset your password
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
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Verify Code
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-primary hover:text-secondary font-medium cursor-pointer"
            >
              Resend OTP
            </button>
          ) : (
            <span className="text-gray-500">Resend in {countdown}s</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordOtpPage;
