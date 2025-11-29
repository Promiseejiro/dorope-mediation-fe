// components/layout/AuthHeader.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../common/Logo";
import GoBack from "../ui/GoBack";

const AuthHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 z-50 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GoBack fallbackUrl="/" className="px-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
