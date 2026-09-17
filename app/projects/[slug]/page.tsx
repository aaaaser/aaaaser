import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getProfile, getSiteSettings } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export const revalidate = 0;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const settings = await getSiteSettings();

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — ${settings.siteName}`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, profile, settings] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      <Navbar siteName={settings.siteName} resumeUrl={profile.resumeUrl} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Breadcrumb Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to all projects</span>
        </Link>

        {/* Project Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200 font-medium">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-medium">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans">
                {project.title}
              </h1>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-2xs"
                >
                  <GithubIcon className="size-4" />
                  <span>Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-mono font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
                >
                  <ExternalLink className="size-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            {project.excerpt}
          </p>

          {/* Cover Showcase Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-6">
            {/* Main Long Description */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
                  Overview & Architecture
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed space-y-4">
                  {project.description.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack & Meta Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-4">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Layers className="size-4" />
                  <span>Technologies Used</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3 font-mono text-xs">
                <div className="text-neutral-400 uppercase text-[10px] tracking-wider">
                  Author & Engineering
                </div>
                <div className="font-bold text-neutral-900 dark:text-neutral-100">
                  {profile.name}
                </div>
                <div className="text-neutral-500">{profile.roleTitle}</div>
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-900 text-[11px] text-neutral-400">
                  Built with high performance and minimal footprint in mind.
                </div>
              </div>
            </div>
          </div>
        </div>
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
