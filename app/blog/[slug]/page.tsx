import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getProfile, getSiteSettings } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { sanitizeHtml } from "@/lib/sanitize";
import { ArrowLeft, Clock, Calendar, Tag, User } from "lucide-react";

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
      title: "Artikel Tidak Ditemukan",
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const image = post.thumbnail || post.coverImageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80";
  const keywords = post.seoKeywords ? post.seoKeywords.split(",").map((k) => k.trim()) : post.tags;

  return {
    title: `${title} — ${settings.siteName}`,
    description: description,
    keywords: keywords,
    authors: [{ name: post.author || "Alex Rivera" }],
    openGraph: {
      title: title,
      description: description,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author || "Alex Rivera"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.thumbnailAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
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

  const sanitizedContent = sanitizeHtml(post.content);
  const coverImage = post.thumbnail || post.coverImageUrl;
  const coverAlt = post.thumbnailAlt || post.title;
  const authorName = post.author || profile.name || "Alex Rivera";

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800">
      <Navbar siteName={settings.siteName} resumeUrl={profile.resumeUrl} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Breadcrumb Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 transition-colors group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke semua artikel</span>
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
                    alt={authorName}
                    fill
                    className="object-cover"
                    sizes="40px"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1">
                    <User className="size-3 text-neutral-400" />
                    <span>{authorName}</span>
                  </div>
                  <div className="text-neutral-400">{profile.roleTitle || "Software Engineer & Designer"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero / Cover Image */}
          {coverImage && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xs bg-neutral-100 dark:bg-neutral-900">
              <Image
                src={coverImage}
                alt={coverAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Article Body Content (Sanitized HTML from TinyMCE) */}
          <div
            className="prose prose-neutral dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed text-base pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:font-mono [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-mono [&_h3]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-1.5 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:bg-neutral-900 [&_pre]:text-neutral-100 [&_pre]:border [&_pre]:border-neutral-800 [&_pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-sm [&_blockquote]:border-l-2 [&_blockquote]:border-neutral-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_img]:rounded-xl [&_img]:my-6"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Tags */}
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono text-neutral-500">
              <Tag className="size-3.5" />
              <span>Topik & Kategori Terkait:</span>
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
