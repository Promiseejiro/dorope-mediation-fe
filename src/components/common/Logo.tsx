// components/common/Logo.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface LogoProps {
  changeOnScroll?: boolean;
  scrolledLogo?: string;
  defaultLogo?: string;
  scrolledTextColor?: string;
  defaultTextColor?: string;
}

const Logo: React.FC<LogoProps> = ({
  changeOnScroll = true,
  scrolledLogo = "/assets/images/white-logo.png",
  defaultLogo = "/assets/images/blue-logo.png",
  scrolledTextColor = "text-white",
  defaultTextColor = "text-primary",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!changeOnScroll) {
      // If changeOnScroll is false, always use default state
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [changeOnScroll]);

  const currentLogo = isScrolled ? scrolledLogo : defaultLogo;
  const currentTextColor = isScrolled ? scrolledTextColor : defaultTextColor;

  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="py-2 rounded-lg transition-all duration-300 bg-transparent">
        <Image
          alt="EduAssess Logo"
          src={currentLogo}
          width={56}
          height={20}
          className="w-14 h-auto transition-all duration-300"
          unoptimized
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
      </div>
      <h1
        className={`text-2xl font-bold transition-colors duration-300 ${currentTextColor}`}
      >
        EduAssess
      </h1>
    </Link>
  );
};

export default Logo;
