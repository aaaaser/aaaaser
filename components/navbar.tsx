"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  siteName?: string;
  resumeUrl?: string | null;
}

export function Navbar({ siteName = "Aaaaser", resumeUrl = "#" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Tech Stack", href: "/#tech-stack" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
          : "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xs border-b border-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 font-mono font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100 group"
        >
          <span className="size-2 rounded-full bg-neutral-900 dark:bg-neutral-100 group-hover:scale-125 transition-transform" />
          <span>{siteName}</span>
          <span className="text-neutral-400 font-normal text-xs ml-1">/dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors font-medium text-xs tracking-wide"
            >
              {link.label}
            </Link>
          ))}

          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-1.5" />

          {/* Theme Toggle */}
          <ThemeToggle className="mx-1" />

          {/* Resume Button */}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              Resume
              <ArrowUpRight className="size-3" />
            </a>
          )}

          {/* Admin link shortcut */}
          <Link
            href="/admin"
            title="Admin Dashboard"
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors ml-1"
          >
            <ShieldCheck className="size-4" />
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900 flex flex-col gap-2">
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-md text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              >
                Download Resume
                <ArrowUpRight className="size-3.5" />
              </a>
            )}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2 rounded-md text-xs font-medium border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              <ShieldCheck className="size-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
