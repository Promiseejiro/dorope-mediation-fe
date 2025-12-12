import React from "react";
import { twMerge } from "tailwind-merge";
import LoadingSpinner from "./LoadingSpinner";

interface LoaderProps {
  fullPage?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullPage = false }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center",
        fullPage
          ? "fixed inset-0 z-50 bg-white/70 backdrop-blur-sm"
          : "w-full h-full"
      )}
    >
      <LoadingSpinner className="" size={70} color="#005cad" />
    </div>
  );
};

export default Loader;
