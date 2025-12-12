// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { toastCustom } from "@/utils/toast";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { resendOtp } from "@/request/authRequest";

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const { setstoredEmail } = useAuthStore();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setLoading } = useUserStore();

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setLoading(true);

      try {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false, // keep this false so you stay in control
        });

        console.log(result);

        if (result?.error) {
          if (result.error === "UNVERIFIED") {
            toastCustom("Please verify your email");
            setstoredEmail(values.email);
            Mutation.mutate(values.email);
            router.push("/verify");
            return;
          }
          toastCustom(result.error, "error");
        } else if (result?.ok) {
          toastCustom("Login successful!", "success");

          const session = await getSession();

          const userId = session?.user && (session.user as any).id;

          if (userId) {
            router.push(`/${userId}`);
          } else {
            router.push("/dashboard");
          }
        } else {
          toastCustom("Login failed. Please try again.", "error");
        }
      } catch (error: any) {
        console.error("Login error:", error);
        toastCustom(error.message || "An unexpected error occurred", "error");
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    },
  });

  const Mutation = useMutation({
    mutationFn: (email: string) => resendOtp(email),
    onSuccess: (data) => {
      toastCustom(data.message, "success");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const handleSocialLogin = async (provider: "google" | "microsoft") => {
    try {
      const result = await signIn(provider, { callbackUrl: "/dashboard" });
      console.log(result);
    } catch (error) {
      toastCustom(`Failed to login with ${provider}`, "error");
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome back
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          showPasswordToggle={true}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            label="Remember me"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-secondary"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or sign in with</span>
        </div>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-3">
        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3 px-2"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <i className="fab fa-google text-primary"></i>
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3 px-2"
          onClick={() => handleSocialLogin("microsoft")}
          disabled={isLoading}
        >
          <i className="fab fa-microsoft text-primary"></i>
          Continue with Microsoft
        </Button>
      </div>

      {/* Sign up link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-secondary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
