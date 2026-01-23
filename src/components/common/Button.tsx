import { twMerge } from "tailwind-merge";
import React from "react";
import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "link"
  | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
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
  loading = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "font-medium rounded-lg transition cursor-pointer flex items-center justify-center";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-white hover:bg-secondary disabled:bg-primary/70 disabled:hover:bg-primary/70 border-2 border-primary",
    secondary:
      "bg-white text-primary hover:bg-gray-50 border border-gray-300 disabled:opacity-70",
    accent: "bg-accent text-white hover:bg-green-600 disabled:bg-accent/70",
    destructive:
      "bg-destructive text-white hover:bg-red-700 disabled:bg-destructive/70",
    outline:
      "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-primary",
    link: "bg-transparent text-primary hover:text-secondary p-0 h-auto font-medium disabled:opacity-70",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 rounded-4xl",
    lg: "px-8 py-4 text-lg rounded-4xl",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
    (disabled || loading) && "cursor-not-allowed",
  );

  const buttonContent = loading ? (
    <p className="py-1">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
    </p>
  ) : (
    children
  );

  if (href && !loading && !disabled) {
    return (
      <Link href={href} className={classes}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
