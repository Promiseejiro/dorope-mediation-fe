// components/auth/RegisterForm.tsx
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

interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const formik = useFormik<RegisterValues>({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      agreeTerms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");

      // Here you would typically make an API call to register the user
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // After successful registration, sign in the user
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (result?.error) {
          setError("Registration successful but login failed");
        } else {
          router.push("/");
        }
      } catch (error) {
        setError("Registration failed. Please try again.");
      }

      setIsLoading(false);
    },
  });

  const handleSocialRegister = async (provider: "google" | "microsoft") => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      setError(`Failed to register with ${provider}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create your account
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.fullName}
          touched={formik.touched.fullName}
        />

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
          placeholder="Create a password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />

        <Checkbox
          id="agreeTerms"
          label={
            <>
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </>
          }
          checked={formik.values.agreeTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.agreeTerms}
          touched={formik.touched.agreeTerms}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or sign up with</span>
        </div>
      </div>

      {/* Social Auth Buttons */}
      <div className="space-y-3">
        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3 px-2"
          onClick={() => handleSocialRegister("google")}
          disabled={isLoading}
        >
          <i className="fab fa-google text-primary"></i>
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3 px-2"
          onClick={() => handleSocialRegister("microsoft")}
          disabled={isLoading}
        >
          <i className="fab fa-microsoft text-primary"></i>
          Continue with Microsoft
        </Button>
      </div>

      {/* Sign in link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-secondary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
