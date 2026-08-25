"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

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

    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }

      const elementId = href.substring(1);
      const element = document.getElementById(elementId);

      if (element) {
        const headerOffset = 88;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth",
        });
      }
    } else {
      router.push(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
              <Image
                src="/assets/images/logo.png"
                alt="Dorope Mediation logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                Dorope<span className="text-primary"> Mediation</span>
              </div>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-slate-500">
                Mediation & Conciliation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("#") ? (
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className="py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`py-2 text-sm font-semibold transition-colors ${
                        pathname === item.href
                          ? "text-primary"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50"
          >
            <i
              className={`fas ${
                mobileMenuOpen ? "fa-times" : "fa-bars"
              } text-sm`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
          <nav>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("#") ? (
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <span>{item.label}</span>
                      <i className="fas fa-chevron-right text-xs text-slate-400" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                        pathname === item.href
                          ? "bg-slate-50 text-primary"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <i className="fas fa-chevron-right text-xs text-slate-400" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
