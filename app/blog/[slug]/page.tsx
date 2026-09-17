import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getProfile, getSiteSettings } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from "lucide-react";

export const revalidate = 0;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const settings = await getSiteSettings();

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} — ${settings.siteName}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImageUrl],
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, profile, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getProfile(),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans">
      <Navbar siteName={settings.siteName} resumeUrl={profile.resumeUrl} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Breadcrumb Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <article className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/70 text-neutral-800 dark:text-neutral-200 font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-neutral-400 font-mono text-xs">
                <Calendar className="size-3.5" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
              <div className="flex items-center gap-1 text-neutral-400 font-mono text-xs">
                <Clock className="size-3.5" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-sans leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
              {post.excerpt}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-4 pb-4 border-y border-neutral-200 dark:border-neutral-800 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="relative size-10 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100">
                    {profile.name}
                  </div>
                  <div className="text-neutral-400">{profile.roleTitle}</div>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <Share2 className="size-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Hero / Cover Image */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Body Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed text-base pt-4">
            {post.content.split("\n\n").map((paragraph, idx) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mt-10 mb-4"
                  >
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mt-8 mb-3"
                  >
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              return (
                <p key={idx} className="mb-6 leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-neutral-500">
              <Tag className="size-3.5" />
              <span>Related Topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md text-xs font-mono border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
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
