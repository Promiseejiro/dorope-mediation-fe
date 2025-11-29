import { twMerge } from "tailwind-merge";
import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  type = "button",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses = "font-medium rounded-lg transition cursor-pointer";

  const variantClasses: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-secondary",
    secondary: "bg-white text-primary hover:bg-gray-50 border border-gray-300",
    accent: "bg-accent text-white hover:bg-yellow-600",
    outline:
      "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white",
    link: "bg-transparent text-primary hover:text-secondary p-0 h-auto font-medium",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
