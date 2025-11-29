// components/common/GoBackEnhanced.tsx
"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";

interface GoBackProps {
  className?: string;
  label?: string;
  fallbackUrl?: string;
  variant?: "link" | "outline" | "secondary";
}

const GoBack: React.FC<GoBackProps> = ({
  className = "",
  label = "Back",
  fallbackUrl = "/",
  variant = "link",
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (!fallbackUrl && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  const mergedClassNames = twMerge("flex items-center gap-2", className);

  return (
    <Button
      variant={variant}
      onClick={handleGoBack}
      className={mergedClassNames}
    >
      <i className="fas fa-arrow-left"></i>
      {label}
    </Button>
  );
};

export default GoBack;
