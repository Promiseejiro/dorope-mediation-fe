// components/layout/Header.tsx
"use client";

import { useState, useEffect, JSX } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "../common/Logo";
import Button from "../ui/Button";
import { AnimatePresence, motion } from "framer-motion";

// Icons for the dropdown menus
const Icons = {
  Assessment: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Quiz: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  Test: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  ),
  Exam: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
    </svg>
  ),
  AI: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  Analytics: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  Compare: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  Business: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  Education: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
    </svg>
  ),
  HumanResources: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  Training: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
  Certification: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  Sales: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  Language: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      />
    </svg>
  ),
  Teacher: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
    </svg>
  ),
  School: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  University: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
};

// Type definitions
interface NavItemBase {
  name: string;
  href: string;
}

interface NavItemWithIcon extends NavItemBase {
  icon: () => JSX.Element;
}

interface NavigationSection {
  title: string;
  description?: string;
  items: (NavItemBase | NavItemWithIcon)[];
}

interface NavigationData {
  product: NavigationSection;
  useCases: NavigationSection & { categories: NavigationSection[] };
}

// Data structure for navigation items - UPDATED TO MATCH FOOTER ROUTES
const navigationData: NavigationData = {
  product: {
    title: "Product",
    items: [
      {
        name: "Skills Assessment",
        href: "/product/skills-assessment",
        icon: Icons.Assessment,
      },
      {
        name: "Online Quiz Maker",
        href: "/product/online-quiz-maker",
        icon: Icons.Quiz,
      },
      {
        name: "Easy Test Maker",
        href: "/product/easy-test-maker",
        icon: Icons.Test,
      },
      {
        name: "Exam Software",
        href: "/product/exam-software",
        icon: Icons.Exam,
      },
      {
        name: "AI-Powered Question Creation",
        href: "/product/ai-question-creation",
        icon: Icons.AI,
      },
      {
        name: "Insights & Analytics",
        href: "/product/insights-analytics",
        icon: Icons.Analytics,
      },
      { name: "Compare", href: "/product/compare", icon: Icons.Compare },
    ],
  },
  useCases: {
    items: [],
    title: "Use Cases",
    description:
      "Discover how EduAssess transforms assessment for different industries",
    categories: [
      {
        title: "FOR BUSINESS",
        description:
          "Streamline hiring, training, and certification processes with enterprise-grade assessment tools",
        items: [
          {
            name: "Human Resources",
            href: "/business/human-resources",
            icon: Icons.HumanResources,
          },
          {
            name: "Training Companies & Staff",
            href: "/business/training-companies",
            icon: Icons.Training,
          },
          {
            name: "Certification",
            href: "/business/certification",
            icon: Icons.Certification,
          },
          {
            name: "Sales & Customer Service",
            href: "/business/sales-customer-service",
            icon: Icons.Sales,
          },
          {
            name: "Language Schools",
            href: "/business/language-schools",
            icon: Icons.Language,
          },
        ],
      },
      {
        title: "FOR EDUCATION",
        description:
          "Enhance learning outcomes with comprehensive assessment solutions for educational institutions",
        items: [
          {
            name: "Teachers",
            href: "/education/teachers",
            icon: Icons.Teacher,
          },
          { name: "Schools", href: "/education/schools", icon: Icons.School },
          {
            name: "Universities & Colleges",
            href: "/education/universities",
            icon: Icons.University,
          },
        ],
      },
    ],
  },
};

const hasIcon = (
  item: NavItemBase | NavItemWithIcon
): item is NavItemWithIcon => {
  return "icon" in item;
};

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<keyof NavigationData | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderUseCasesDropdown = () => {
    return (
      <AnimatePresence>
        {hoveredNav === "useCases" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 2 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-8 rounded-xl bg-white shadow-lg border border-gray-100 z-50 min-w-[600px]"
            onMouseEnter={() => setHoveredNav("useCases")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <div className="px-6 py-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium">
                  {navigationData.useCases.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {navigationData.useCases.categories.map((category, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      {category.title === "FOR BUSINESS" && <Icons.Business />}
                      {category.title === "FOR EDUCATION" && (
                        <Icons.Education />
                      )}
                      <p className="font-semibold text-gray-900 text-sm">
                        {category.title}
                      </p>
                    </div>

                    {category.description && (
                      <p className="text-xs text-gray-500 mb-3">
                        {category.description}
                      </p>
                    )}

                    <div className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:text-primary  rounded-md transition-colors duration-200"
                          onClick={() => setHoveredNav(null)}
                        >
                          {hasIcon(item) && <item.icon />}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderProductDropdown = () => {
    const nav = navigationData.product;

    return (
      <AnimatePresence>
        {hoveredNav === "product" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 2 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-8 rounded-xl bg-white shadow-lg border border-gray-100 z-50 min-w-[280px]"
            onMouseEnter={() => setHoveredNav("product")}
            onMouseLeave={() => setHoveredNav(null)}
          >
            <div className="px-6 py-4">
              <div className="space-y-2">
                {nav.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:text-primary  rounded-md transition-colors duration-200"
                    onClick={() => setHoveredNav(null)}
                  >
                    {hasIcon(item) && <item.icon />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <header
      className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo changeOnScroll={true} />

        <nav className="flex">
          <div className="flex gap-8 py-2">
            {/* Product Dropdown */}
            <div className="relative">
              <Link
                href="#"
                className={`font-medium flex items-center transition-colors duration-300 ${
                  isScrolled
                    ? "text-white hover:text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
                onMouseEnter={() => setHoveredNav("product")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                Product
              </Link>
              {renderProductDropdown()}
            </div>

            {/* Use Cases Dropdown */}
            <div className="relative">
              <Link
                href="#"
                className={`font-medium flex items-center transition-colors duration-300 ${
                  isScrolled
                    ? "text-white hover:text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
                onMouseEnter={() => setHoveredNav("useCases")}
                onMouseLeave={() => setHoveredNav(null)}
              >
                Use Cases
              </Link>
              {renderUseCasesDropdown()}
            </div>

            {/* Simple Links - No Dropdown */}
            <Link
              href="/who-its-for"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Who it's for
            </Link>

            <Link
              href="/pricing"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/resources"
              className={`font-medium flex items-center transition-colors duration-300 ${
                isScrolled
                  ? "text-white hover:text-primary"
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
                isScrolled ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
          ) : session ? (
            <>
              <span
                className={`w-10 h-10 border-solid border-2 rounded-full font-medium transition-colors duration-300 font-semibold flex items-center justify-center text-lg ${
                  isScrolled
                    ? "text-white border-white"
                    : "text-primary border-primary"
                }`}
              >
                {session.user?.name.slice(0, 1)}
              </span>
              <Button
                variant={isScrolled ? "outline" : "outline"}
                size="sm"
                onClick={() => signOut()}
                className={
                  isScrolled
                    ? "border-white text-white hover:bg-white hover:text-primary"
                    : ""
                }
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
                  className={
                    isScrolled
                      ? "border-white text-white hover:bg-white hover:text-primary"
                      : ""
                  }
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
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
