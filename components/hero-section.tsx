"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, FolderGit2 } from "lucide-react";
import { BackgroundRipple } from "./background-ripple";

export interface HeroSectionProps {
  name?: string;
  roleTitle?: string;
  shortDescription?: string;
  badgeText?: string | null;
  badge?: string | null;
  title?: string;
  subtitle?: string;
  description?: string;
  resumeUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  email?: string;
  availableForWork?: boolean;
}

export function HeroSection({
  name,
  roleTitle,
  shortDescription,
  badgeText,
  badge,
  title,
  subtitle,
  description,
  resumeUrl,
  availableForWork = true,
}: HeroSectionProps) {
  const displayBadge = badgeText || badge || "Available for new projects & opportunities";
  const displayTitle = title || (name ? `Hi, I'm ${name}.` : "Engineering fast, elegant &");
  const displaySubtitle = subtitle || roleTitle || "Full-Stack Developer";
  const displayDescription =
    description ||
    shortDescription ||
    "Specializing in modern web applications, Next.js, TypeScript, PostgreSQL, and high-performance user interfaces with meticulous attention to detail.";

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden pt-20">
      {/* Aceternity UI Background Ripple Component */}
      <BackgroundRipple />

      {/* Main Content container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        {/* Availability Badge */}
        {displayBadge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-xs font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs">
            {availableForWork && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
            <span>{displayBadge}</span>
            <Sparkles className="size-3 text-neutral-400" />
          </div>
        )}

        {/* Hero Title with High Impact Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans leading-[1.08]">
          <span>{displayTitle} </span>
          <span className="text-neutral-400 dark:text-neutral-500">{displaySubtitle}</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
          {displayDescription}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xs group"
          >
            <FolderGit2 className="size-3.5" />
            <span>Explore Projects</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
          >
            <span>Get in Touch</span>
          </Link>

          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <span>Download CV</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
