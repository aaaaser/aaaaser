import { Metadata } from "next";
import Link from "next/link";
import { getProfile, getSiteSettings, getTechnologies } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/about-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [profile, settings] = await Promise.all([getProfile(), getSiteSettings()]);
  return {
    title: `About — ${profile.name} | ${settings.siteName}`,
    description: profile.shortDescription,
  };
}

export default async function AboutPage() {
  const [profile, settings, technologies] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getTechnologies(),
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      <Navbar siteName={settings.siteName} resumeUrl={profile.resumeUrl} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* About Main Component */}
        <AboutSection
          name={profile.name}
          roleTitle={profile.roleTitle}
          bio={profile.bio}
          avatarUrl={profile.avatarUrl}
          location={profile.location}
          experienceYears={profile.experienceYears}
          shortDescription={profile.shortDescription}
          email={profile.email}
          websiteUrl={profile.websiteUrl}
          resumeUrl={profile.resumeUrl}
          availableForWork={profile.availableForWork}
        />

        {/* Tech Stack */}
        <TechStackSection technologies={technologies} />
      </main>

      <Footer
        siteName={settings.siteName}
        footerText={settings.footerText}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
        instagramUrl={profile.instagramUrl}
        email={profile.email}
      />
    </div>
  );
}
