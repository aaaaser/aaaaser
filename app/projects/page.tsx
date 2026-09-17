import { Metadata } from "next";
import Link from "next/link";
import { getProjects, getSiteSettings, getProfile } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProjectsClientView } from "@/components/projects-client-view";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `Projects — ${settings.siteName}`,
    description: "Explore curated software engineering projects, applications, and experiments.",
  };
}

export default async function ProjectsPage() {
  const [projects, settings, profile] = await Promise.all([
    getProjects({ publishedOnly: true }),
    getSiteSettings(),
    getProfile(),
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      <Navbar siteName={settings.siteName} resumeUrl={profile.resumeUrl} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Home</span>
          </Link>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
              <span className="size-1.5 rounded-full bg-neutral-400" />
              <span>Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
              All Projects & Works
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-base max-w-2xl">
              A comprehensive showcase of web applications, developer tooling, open-source libraries, and interactive systems.
            </p>
          </div>
        </div>

        {/* Interactive Filterable Projects Grid */}
        <ProjectsClientView projects={projects} />
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
