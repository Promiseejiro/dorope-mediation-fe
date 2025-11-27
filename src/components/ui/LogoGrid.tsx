"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";

interface LogoGridProps {
  className?: string;
  gap?: string;
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  py?: string;
  maxLogosPerRow?: number;
  backgroundColor?: string;
  svgColor?: string;
  w?: string;
}

const LogoGrid: React.FC<LogoGridProps> = ({
  className = "h-10 filter invert-0 brightness-0",
}) => {
  const logosArray = [
    {
      url: "https://res.cloudinary.com/dx1etzf66/image/upload/v1761889068/Stripe_ecrzh7.png",
      imageAlt: "Stripe",
    },
    {
      url: "https://res.cloudinary.com/dx1etzf66/image/upload/v1761890451/flutterwave-1_iivhor.svg",
      imageAlt: "flutterwave",
    },
    {
      url: "https://res.cloudinary.com/dx1etzf66/image/upload/v1761889000/Checkbox_y9pnxl.webp",
      imageAlt: "Checkbox",
    },
    {
      url: "https://res.cloudinary.com/dx1etzf66/image/upload/v1761890641/1200px-Paystack_Logo_pgortw.png",
      imageAlt: "Paystack_Logo",
    },
    {
      url: "https://res.cloudinary.com/dx1etzf66/image/upload/v1761890602/fireblocks-logo_aioa7u.svg",
      imageAlt: "fireblocks",
    },
  ];

  const [windowWidth, setWindowWidth] = useState(1440);
  const { scrollY } = useScroll();
  // Get window width on client side only
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="overflow-hidden">
      <div className="overflow-hidden ">
        <motion.div
          className="flex w-max gap-10"
          animate={{
            x: [0, -windowWidth / 2],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Original logos */}
          {logosArray.map((logoItem, index) => (
            <motion.span
              key={`original-${logoItem.imageAlt}-${index}`}
              className="flex gap-10 font-semibold whitespace-nowrap text-lg lg:text-[32px]"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logoItem.url}
                alt={logoItem.imageAlt}
                height="20"
                className={`h-10 ${className}`}
              />
            </motion.span>
          ))}

          {logosArray.map((logoItem, index) => (
            <motion.span
              key={`duplicate-${logoItem.imageAlt}-${index}`}
              className="flex gap-10 font-semibold whitespace-nowrap text-lg lg:text-[32px]"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logoItem.url}
                alt={logoItem.imageAlt}
                height="20"
                className={`h-10 ${className}`}
              />
            </motion.span>
          ))}
          {logosArray.map((logoItem, index) => (
            <motion.span
              key={`duplicate-${logoItem.imageAlt}-${index}`}
              className="flex gap-10 font-semibold whitespace-nowrap text-lg lg:text-[32px]"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={logoItem.url}
                alt={logoItem.imageAlt}
                height="20"
                className={`h-10 ${className}`}
              />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LogoGrid;
