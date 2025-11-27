"use client";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  return router.push("/auth/login");
}
