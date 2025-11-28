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
  hideText?: boolean;
  iconSize?: "sm" | "md" | "lg" | "xl";
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl";
  customIconWidth?: number;
  customIconHeight?: number;
  customText?: string;
  showTagline?: boolean;
  tagline?: string;
  taglineSize?: "xs" | "sm" | "md";
  className?: string;
  href?: string;
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
  changeOnScroll = true,
  scrolledLogo = "/assets/images/white-logo.png",
  defaultLogo = "/assets/images/blue-logo.png",
  scrolledTextColor = "text-white",
  defaultTextColor = "text-primary",
  hideText = false,
  iconSize = "md",
  textSize = "2xl",
  customIconWidth,
  customIconHeight,
  customText = "EduAssess",
  showTagline = false,
  tagline = "Digital Assessment Platform",
  taglineSize = "xs",
  className = "",
  href = "/",
  onClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!changeOnScroll) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [changeOnScroll]);

  const currentLogo = isScrolled ? scrolledLogo : defaultLogo;
  const currentTextColor = isScrolled ? scrolledTextColor : defaultTextColor;

  const iconSizeMap = {
    sm: { width: 32, height: 32, className: "w-8" },
    md: { width: 48, height: 48, className: "w-12" },
    lg: { width: 64, height: 64, className: "w-16" },
    xl: { width: 80, height: 80, className: "w-20" },
  };

  const textSizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const taglineSizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
  };

  const selectedIconSize = iconSizeMap[iconSize];
  const selectedTextSize = textSizeMap[textSize];
  const selectedTaglineSize = taglineSizeMap[taglineSize];

  const iconWidth = customIconWidth || selectedIconSize.width;
  const iconHeight = customIconHeight || selectedIconSize.height;

  const handleImageError = () => {
    setImageError(true);
  };

  const LogoContent = () => (
    <div
      className={`flex items-center space-x-2 no-underline hover:no-underline ${className}`}
    >
      <div className="py-2 rounded-lg transition-all duration-300 bg-transparent">
        {!imageError ? (
          <Image
            alt="EduAssess Logo"
            src={currentLogo}
            width={iconWidth}
            height={iconHeight}
            className={`${selectedIconSize.className} h-auto transition-all duration-300`}
            unoptimized
            onError={handleImageError}
            priority
          />
        ) : (
          <div
            className={`${selectedIconSize.className} h-auto bg-primary rounded-lg flex items-center justify-center transition-all duration-300`}
          >
            <span className="text-white font-bold text-sm">EA</span>
          </div>
        )}
      </div>

      {!hideText && (
        <div className="flex flex-col">
          <h1
            className={`font-bold transition-colors duration-300 ${currentTextColor} ${selectedTextSize} leading-tight`}
          >
            {customText}
          </h1>
          {showTagline && (
            <p
              className={`text-gray-500 ${selectedTaglineSize} leading-tight mt-0.5`}
            >
              {tagline}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="bg-transparent border-none p-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <LogoContent />
      </button>
    );
  }

  return (
    <Link href={href} className="no-underline hover:no-underline">
      <LogoContent />
    </Link>
  );
};

export default Logo;
