"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "../common/Logo";

const MobileHeader: React.FC = () => {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{
    product: boolean;
    useCases: boolean;
    business: boolean;
    education: boolean;
  }>({
    product: false,
    useCases: false,
    business: false,
    education: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset expanded sections when closing menu
    if (isMenuOpen) {
      setExpandedSections({
        product: false,
        useCases: false,
        business: false,
        education: false,
      });
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedSections({
      product: false,
      useCases: false,
      business: false,
      education: false,
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Product items
  const productItems = [
    { name: "Skills Assessment", href: "/product/skills-assessment" },
    { name: "Online Quiz Maker", href: "/product/online-quiz-maker" },
    { name: "Easy Test Maker", href: "/product/easy-test-maker" },
    { name: "Exam Software", href: "/product/exam-software" },
    {
      name: "AI-Powered Question Creation",
      href: "/product/ai-question-creation",
    },
    { name: "Insights & Analytics", href: "/product/insights-analytics" },
    { name: "Compare", href: "/product/compare" },
  ];

  // Business items
  const businessItems = [
    { name: "Human Resources", href: "/business/human-resources" },
    {
      name: "Training Companies & Staff",
      href: "/business/training-companies",
    },
    { name: "Certification", href: "/business/certification" },
    {
      name: "Sales & Customer Service",
      href: "/business/sales-customer-service",
    },
    { name: "Language Schools", href: "/business/language-schools" },
  ];

  // Education items
  const educationItems = [
    { name: "Teachers", href: "/education/teachers" },
    { name: "Schools", href: "/education/schools" },
    { name: "Universities & Colleges", href: "/education/universities" },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <header
        className={`lg:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right Side - Language and Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select className="text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer text-sm">
              <option>EN</option>
              <option>ES</option>
              <option>FR</option>
              <option>DE</option>
            </select>

            {/* Hamburger Menu Button */}
            <button
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto pb-20">
            {/* User Info Section */}
            {session && (
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600">Welcome back</p>
                <p className="font-medium text-gray-900">
                  {session.user?.name}
                </p>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="px-4 py-4">
              {/* Product Section */}
              <div className="mb-2">
                <button
                  onClick={() => toggleSection("product")}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <span className="font-medium text-left">Product</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSections.product ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections.product && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4">
                    {productItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                        onClick={closeMenu}
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Use Cases Section */}
              <div className="mb-2">
                <button
                  onClick={() => toggleSection("useCases")}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <span className="font-medium text-left">Use Cases</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSections.useCases ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedSections.useCases && (
                  <div className="ml-4 mt-1 space-y-2 border-l-2 border-gray-100 pl-4">
                    {/* Business Sub-section */}
                    <div>
                      <button
                        onClick={() => toggleSection("business")}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                      >
                        <span>FOR BUSINESS</span>
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${
                            expandedSections.business ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedSections.business && (
                        <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                          {businessItems.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                              onClick={closeMenu}
                            >
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Education Sub-section */}
                    <div>
                      <button
                        onClick={() => toggleSection("education")}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                      >
                        <span>FOR EDUCATION</span>
                        <svg
                          className={`w-3 h-3 transition-transform duration-200 ${
                            expandedSections.education ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedSections.education && (
                        <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                          {educationItems.map((item, index) => (
                            <Link
                              key={index}
                              href={item.href}
                              className="flex items-center px-3 py-2 text-xs text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                              onClick={closeMenu}
                            >
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Simple Links - No Dropdown */}
              <Link
                href="/who-its-for"
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={closeMenu}
              >
                <span className="font-medium">Who it's for</span>
              </Link>

              <Link
                href="/pricing"
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={closeMenu}
              >
                <span className="font-medium">Pricing</span>
              </Link>

              <Link
                href="/resources"
                className="flex items-center w-full px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={closeMenu}
              >
                <span className="font-medium">Resources</span>
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="px-6 py-6 border-t border-gray-200">
              {status === "loading" ? (
                <div className="space-y-3">
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              ) : session ? (
                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="block w-full text-center px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      closeMenu();
                      signOut();
                    }}
                    className="block w-full text-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Additional Links */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Help Center
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Contact
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Backdrop Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 top-16"
            onClick={closeMenu}
          />
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default MobileHeader;
