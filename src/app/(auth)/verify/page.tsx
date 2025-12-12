"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import OtpInput from "@/components/ui/OtpInput";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { resendOtp, verifyUser } from "@/request/authRequest";
import { VerifyFormData } from "@/types/auth";
import { toastCustom } from "@/utils/toast";

const VerifyPage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { storedEmail } = useAuthStore();

  const initialValues: VerifyFormData = {
    otp: "",
    email: storedEmail,
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must contain only numbers")
      .required("OTP is required"),
  });

  const handleSubmit = async (values: VerifyFormData) => {
    mutation.mutate(values);
  };

  const handleResendOtp = async () => {
    if (!canResend || resendMutation.isPending) return;
    resendMutation.mutate();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const mutation = useMutation({
    mutationFn: (data: VerifyFormData) => verifyUser(data),
    onSuccess: (data) => {
      toastCustom(data.message, "success");
      router.push("/login");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => resendOtp(storedEmail),
    onSuccess: (data) => {
      setCountdown(60);
      setCanResend(false);
      toastCustom(data.message, "success");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  useEffect(() => {
    if (!storedEmail) {
      router.push("/register");
    }
  }, [storedEmail, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const isResendDisabled = !canResend || resendMutation.isPending;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your Account
        </h2>
        <p className="text-gray-600">We've sent a 6-digit code to your email</p>
        <p className="mt-1 font-medium text-primary break-all">
          {storedEmail || "example@email.com"}
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
          disabled={mutation.isPending || formik.values.otp.length !== 6}
          loading={mutation.isPending}
        >
          {mutation.isPending ? "Verifying..." : "Verify Account"}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className={`text-primary hover:text-secondary font-medium ${
                isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {resendMutation.isPending ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <span className="text-gray-500">Resend in {countdown}s</span>
          )}
        </p>
      </div>

      {/* <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-primary text-center">
          Check your email inbox and spam folder for the verification code.
        </p>
      </div> */}

      {/* {resendMutation.isSuccess && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700 text-center">
            New OTP sent successfully! Check your email.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default VerifyPage;
