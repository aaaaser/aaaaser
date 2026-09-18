import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

export interface BlogPostItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string | null;
  thumbnailAlt?: string | null;
  coverImageUrl: string;
  category: string;
  tags: string[];
  author?: string | null;
  status?: string | null;
  readingTime: string;
  published: boolean;
  publishedAt: Date;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  focusKeyword?: string | null;
  seoScore?: number | null;
}

export function BlogCard({ post }: { post: BlogPostItem }) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const imageSrc = post.thumbnail || post.coverImageUrl;
  const imageAlt = post.thumbnailAlt || post.title;

  return (
    <article className="group rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-xs">
      <div>
        <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium border border-neutral-200/80 dark:border-neutral-700/80 bg-white/90 dark:bg-neutral-900/90 text-neutral-800 dark:text-neutral-200 backdrop-blur-xs">
              {post.category}
            </span>
          </div>
        </Link>

        <div className="p-6">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {post.readingTime}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors flex items-center justify-between">
              <span>{post.title}</span>
              <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
          </Link>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
        >
          Read article &rarr;
        </Link>
      </div>
    </article>
  );
}
