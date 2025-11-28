// components/auth/LoginForm.tsx
"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik<AuthValues>({
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
      rememberMe: Yup.boolean(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }

      setIsLoading(false);
    },
  });

  const handleSocialLogin = async (provider: "google" | "microsoft") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      setError(`Failed to sign in with ${provider}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Sign in to EduAssess
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
        />

        <div className="flex items-center justify-between">
          <Checkbox
            id="rememberMe"
            label="Remember me"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-secondary font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
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
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-3">
        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <i className="fab fa-google text-red-500"></i>
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3"
          onClick={() => handleSocialLogin("microsoft")}
          disabled={isLoading}
        >
          <i className="fab fa-microsoft text-primary"></i>
          Continue with Microsoft
        </Button>
      </div>

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
