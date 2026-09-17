import React from "react";
import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

interface FooterProps {
  siteName?: string;
  footerText?: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  email?: string;
}

export function Footer({
  siteName = "Aaaaser",
  footerText = "Designed with precision. Minimal, fast, and accessible.",
  githubUrl,
  linkedinUrl,
  instagramUrl,
  email,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-xs transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Note */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="font-mono font-bold text-sm text-neutral-900 dark:text-neutral-100">
              {siteName}
            </span>
            <span className="text-neutral-400 text-xs font-mono">&copy; {currentYear}</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans text-center md:text-left">
            {footerText}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
          <Link
            href="/#about"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/login"
            className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-0.5"
          >
            Admin
            <ArrowUpRight className="size-3 opacity-60" />
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <GithubIcon className="size-4" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <LinkedinIcon className="size-4" />
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <InstagramIcon className="size-4" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              aria-label="Email"
              className="p-2 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <Mail className="size-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
