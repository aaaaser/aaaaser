import React from "react";
import Image from "next/image";
import { MapPin, Briefcase, Calendar, Mail, Globe, ArrowUpRight } from "lucide-react";

interface AboutSectionProps {
  name: string;
  roleTitle: string;
  bio: string;
  avatarUrl: string;
  location: string;
  experienceYears: string;
  shortDescription: string;
  email: string;
  websiteUrl?: string | null;
  resumeUrl?: string | null;
  availableForWork?: boolean;
}

export function AboutSection({
  name,
  roleTitle,
  bio,
  avatarUrl,
  location,
  experienceYears,
  shortDescription,
  email,
  websiteUrl,
  resumeUrl,
  availableForWork,
}: AboutSectionProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex flex-col gap-2 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-neutral-400" />
          <span>About Me</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Crafting thoughtful digital solutions with precision.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Avatar & Quick Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 group">
            <div className="relative aspect-square w-full">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xs border-t border-neutral-200 dark:border-neutral-800">
              <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 font-mono">{name}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{roleTitle}</p>
            </div>
          </div>

          {/* Highlights Box */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 p-5 space-y-3.5 text-xs font-mono">
            <div className="flex items-center justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                Location
              </span>
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">{location}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Briefcase className="size-3.5" />
                Experience
              </span>
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">{experienceYears}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-neutral-200/60 dark:border-neutral-800/60">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Mail className="size-3.5" />
                Email
              </span>
              <a href={`mailto:${email}`} className="text-neutral-800 dark:text-neutral-200 font-medium hover:underline">
                {email}
              </a>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                Status
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {availableForWork ? "Available" : "Engaged"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio and In-depth story */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Background & Philosophy
            </h3>

            <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300 space-y-4">
              <p className="text-neutral-900 dark:text-neutral-100 font-medium text-lg leading-snug">
                {shortDescription}
              </p>
              <div className="whitespace-pre-line text-neutral-600 dark:text-neutral-400">
                {bio}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-4">
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Download Full CV / Resume
                  <ArrowUpRight className="size-3.5" />
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Globe className="size-3.5" />
                  Personal Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
