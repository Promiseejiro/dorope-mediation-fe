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
import { useMutation } from "@tanstack/react-query";
import { RegisterValues } from "../../types/auth";
import { registerUser } from "@/request/authRequest";
import { toastCustom } from "@/utils/toast";
import { useAuthStore } from "@/store/authStore";

const RegisterForm: React.FC = () => {
  const { setstoredEmail } = useAuthStore();
  const [error, setError] = useState("");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: RegisterValues) => registerUser(data),
    onSuccess: (data, formdata) => {
      setstoredEmail(formdata.email);
      router.push("/verify");
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });
  const formik = useFormik<RegisterValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
      lastName: Yup.string()
        .min(2, "Full name must be at least 2 characters")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      // confirmPassword: Yup.string()
      //   .oneOf([Yup.ref("password")], "Passwords must match")
      //   .required("Confirm password is required"),
      agreeTerms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values) => {
      mutation.mutate(values);
      try {
      } catch (error) {
        setError("Registration failed. Please try again.");
      }
    },
  });

  const handleSocialRegister = async (provider: "google" | "microsoft") => {
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      setError(`Failed to register with ${provider}`);
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create your account
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter your FirstName name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
        />
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter your LastName name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
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
          showPasswordToggle={true}
        />

        {/* <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        /> */}

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
          loading={mutation.isPending}
          disabled={mutation.isPending}
        >
          Create Account
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
          // disabled={isLoading}
        >
          <i className="fab fa-google text-primary"></i>
          Continue with Google
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-full flex items-center justify-center gap-3 px-2"
          onClick={() => handleSocialRegister("microsoft")}
          // disabled={isLoading}
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
