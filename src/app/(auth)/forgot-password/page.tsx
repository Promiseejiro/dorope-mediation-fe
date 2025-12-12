"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "@/request/authRequest";
import { ForgotPasswordFormData } from "@/types/auth";
import { toastCustom } from "@/utils/toast";
import { useAuthStore } from "@/store/authStore";

const ForgotPasswordPage: React.FC = () => {
  const { setstoredEmail } = useAuthStore();

  const router = useRouter();

  const initialValues: ForgotPasswordFormData = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordFormData) => forgetPassword(data),
    onSuccess: (data, formdata) => {
      router.push("/reset-password-otp");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: ForgotPasswordFormData) => {
      mutation.mutate(values);
      setstoredEmail(values.email);
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <Logo changeOnScroll={false} />
        {/* <p className="mt-1 text-gray-600">Digital Assessment Platform</p> */}
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-600">
          Enter your email and we'll send you a code to reset your password
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Send Reset Code
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-secondary font-medium"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
