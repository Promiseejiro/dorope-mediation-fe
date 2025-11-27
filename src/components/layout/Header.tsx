// components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "../common/Logo";
import Button from "../ui/Button";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Change after 50px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary " : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo changeOnScroll={true} />
        <nav className="hidden md:flex">
          <div className="flex gap-6 py-2">
            <Link
              href="/who-its-for"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Who it's for
            </Link>
            <Link
              href="/use-cases"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Use cases
            </Link>
            <Link
              href="/pricing"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-blue-200"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Resources
            </Link>
          </div>
        </nav>

        <div className="flex space-x-4">
          {status === "loading" ? (
            <div
              className={`h-8 w-20 animate-pulse rounded ${
                isScrolled ? "bg-blue-400" : "bg-gray-200"
              }`}
            ></div>
          ) : session ? (
            <>
              <span
                className={`font-medium transition-colors duration-300 ${
                  isScrolled ? "text-white" : "text-gray-700"
                }`}
              >
                {session.user?.name}
              </span>
              <Button
                variant={isScrolled ? "outline" : "outline"}
                size="sm"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant={isScrolled ? "outline" : "outline"}
                  size="sm"
                  className={isScrolled ? "text-white" : ""}
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant={isScrolled ? "secondary" : "primary"}
                  size="sm"
                >
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
