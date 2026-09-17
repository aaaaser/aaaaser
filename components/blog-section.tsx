import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard, BlogPostItem } from "./blog-card";

interface BlogSectionProps {
  posts: BlogPostItem[];
  showAllLink?: boolean;
}

export function BlogSection({ posts, showAllLink = true }: BlogSectionProps) {
  return (
    <section id="blog" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
            <span className="size-1.5 rounded-full bg-neutral-400" />
            <span>Articles & Insights</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Writing on tech, design & engineering.
          </h2>
        </div>

        {showAllLink && (
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <span>View all articles ({posts.length})</span>
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-neutral-500 font-mono text-sm">
          No articles published yet. Write your first post in the Admin Dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
