"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Router } from "next/router";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const navigation = useRouter();
  const pathName = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Peace Events", href: "#events" },
    { label: "Why Mediation", href: "#comparison" },
    { label: "Teams", href: "/teams" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);

    // If it's a hash link (section on current page)
    if (href.startsWith("#")) {
      // If we're not on the homepage, navigate to homepage first
      if (pathName !== "/") {
        navigation.push(`/${href}`);
      } else {
        // We're already on homepage, just scroll
        const elementId = href.substring(1);
        const element = document.getElementById(elementId);
        if (element) {
          const headerOffset = 80; // Adjust based on header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    } else {
      navigation.push(href);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-10 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              alt="Dorop Mediation logo"
              height={60}
              width={60}
              src="/assets/images/logo.png"
            />
            {/* <i className="fas fa-dove text-4xl text-primary"></i> */}
            <div className="text-2xl font-bold text-foreground">
              Dorope<span className="text-accent">{`  `}Mediation</span>
            </div>
          </Link>

          <button
            className="md:hidden text-primary text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>

          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {navItems.map((item) => (
                <li key={item.label} className="cursor-pointer">
                  {item.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-foreground font-semibold hover:text-accent transition-colors text-lg"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-foreground font-semibold hover:text-accent transition-colors text-lg"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-14 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-6 pt-16">
          {/* <button
            className="absolute top-6 right-6 text-primary text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button> */}
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground font-semibold hover:text-accent transition-colors text-lg w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
