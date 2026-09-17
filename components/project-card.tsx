import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  category: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  technologies: string[];
  featured: boolean;
  published: boolean;
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <div className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-xs">
      <div>
        {/* Cover Image */}
        <Link href={`/projects/${project.slug}`} className="block relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border border-neutral-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 backdrop-blur-xs">
              {project.category}
            </span>
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-6">
          <Link href={`/projects/${project.slug}`} className="block group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
            <h3 className="text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mb-2 flex items-center justify-between">
              <span>{project.title}</span>
              <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-2 leading-relaxed">
            {project.excerpt}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer / Links */}
      <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white font-medium inline-flex items-center gap-1"
        >
          Details &rarr;
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="View Source on GitHub"
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors p-1"
            >
              <GithubIcon className="size-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-[11px] font-medium"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="size-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
