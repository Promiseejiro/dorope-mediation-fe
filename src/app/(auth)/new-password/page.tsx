// app/auth/new-password/page.tsx
"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { ResetPasswordFormData } from "@/types/auth";
import { toastCustom } from "@/utils/toast";
import { ResetPassword } from "@/request/authRequest";
import { useAuthStore } from "@/store/authStore";

const NewPasswordPage: React.FC = () => {
  const router = useRouter();
  const { storedEmail } = useAuthStore();

  const initialValues: ResetPasswordFormData = {
    newPassword: "",
    confirmPassword: "",
    email: storedEmail,
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data: ResetPasswordFormData) => {
      console.log(data);
      mutation.mutate(data);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ResetPasswordFormData) => ResetPassword(data),
    onSuccess: (data, formdata) => {
      router.push("/login");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create New Password
        </h2>
        <p className="text-gray-600">
          Your new password must be different from previous used passwords
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <Input
          id="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.newPassword}
          touched={formik.touched.newPassword}
          showPasswordToggle={true} // Add this prop to enable toggle
        />

        <Input
          id="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
          showPasswordToggle={true}
        />
        {/* <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-primary">
            <strong>Password requirements:</strong>
            <br />• At least 8 characters
            <br />• One uppercase letter
            <br />• One lowercase letter
            <br />• One number
          </p>
        </div> */}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
