"use client";

import React, { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Calendar,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
  Folder,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { ThumbnailUpload } from "./thumbnail-upload";
import { TinyMceEditor } from "./tinymce-editor";
import { SeoAssistant } from "./seo-assistant";
import { calculateSeoScore } from "@/lib/seo/analyzer";
import { saveBlogPostAdminAction } from "@/app/actions";
import { BlogPostItem } from "@/components/blog-card";
import { cn } from "@/lib/utils";

interface BlogFormProps {
  initialData?: BlogPostItem | null;
  mode: "create" | "edit";
}

export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showLowSeoWarningModal, setShowLowSeoWarningModal] = useState(false);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isSlugManual, setIsSlugManual] = useState(Boolean(initialData?.slug));
  const [category, setCategory] = useState(initialData?.category || "Engineering");
  const [customCategory, setCustomCategory] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || ["Engineering", "Web Development"]);
  const [tagInput, setTagInput] = useState("");
  const [author, setAuthor] = useState(initialData?.author || "Alex Rivera");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [thumbnail, setThumbnail] = useState(
    initialData?.thumbnail || initialData?.coverImageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80"
  );
  const [thumbnailAlt, setThumbnailAlt] = useState(initialData?.thumbnailAlt || initialData?.title || "");
  
  // Publishing state
  const [status, setStatus] = useState<"draft" | "published">(
    (initialData?.status as "draft" | "published") || (initialData?.published === false ? "draft" : "published")
  );
  const [publishedAt, setPublishedAt] = useState<string>(
    initialData?.publishedAt
      ? new Date(initialData.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );

  // SEO Fields
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "");
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");
  const [seoKeywords, setSeoKeywords] = useState(initialData?.seoKeywords || "");

  // Categories list
  const PRESET_CATEGORIES = ["Engineering", "Architecture", "Design & UX", "Career & Thoughts", "Tutorial", "Next.js"];

  // Auto-generate slug from title if not manually customized
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isSlugManual) {
      const generatedSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Real-time SEO calculation
  const seoAnalysis = useMemo(() => {
    return calculateSeoScore({
      title,
      slug,
      content,
      excerpt,
      thumbnail,
      thumbnailAlt,
      focusKeyword,
      seoTitle,
      seoDescription,
      seoKeywords,
    });
  }, [title, slug, content, excerpt, thumbnail, thumbnailAlt, focusKeyword, seoTitle, seoDescription, seoKeywords]);

  const handleSubmit = (overrideStatus?: "draft" | "published", skipSeoCheck: boolean = false) => {
    setError(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setError("Judul artikel tidak boleh kosong.");
      return;
    }

    if (!excerpt.trim()) {
      setError("Excerpt / ringkasan artikel tidak boleh kosong.");
      return;
    }

    if (!content.trim()) {
      setError("Konten artikel (TinyMCE) tidak boleh kosong.");
      return;
    }

    const finalStatus = overrideStatus || status;
    const finalPublished = finalStatus === "published";

    // Non-blocking SEO check when publishing
    if (finalPublished && seoAnalysis.score < 60 && !skipSeoCheck) {
      setShowLowSeoWarningModal(true);
      return;
    }

    setShowLowSeoWarningModal(false);

    const effectiveCategory = category === "custom" && customCategory.trim() ? customCategory.trim() : category;
    const effectiveSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    startTransition(async () => {
      try {
        await saveBlogPostAdminAction({
          id: initialData?.id,
          title: title.trim(),
          slug: effectiveSlug,
          excerpt: excerpt.trim(),
          content: content,
          thumbnail: thumbnail.trim(),
          thumbnailAlt: thumbnailAlt.trim(),
          coverImageUrl: thumbnail.trim(),
          category: effectiveCategory,
          tags: tags,
          author: author.trim() || "Alex Rivera",
          status: finalStatus,
          published: finalPublished,
          publishedAt: new Date(publishedAt),
          readingTime: `${seoAnalysis.readingTimeMinutes} min read`,
          seoTitle: seoTitle.trim(),
          seoDescription: seoDescription.trim(),
          seoKeywords: seoKeywords.trim(),
          focusKeyword: focusKeyword.trim(),
          seoScore: seoAnalysis.score,
        });

        setSuccessMsg(
          mode === "create"
            ? finalPublished
              ? "Artikel berhasil diterbitkan!"
              : "Draft artikel berhasil disimpan!"
            : "Perubahan artikel berhasil disimpan!"
        );

        setTimeout(() => {
          router.push("/admin/blog");
          router.refresh();
        }, 800);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan artikel.";
        setError(msg);
      }
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
              {mode === "create" ? "Tulis Artikel Baru" : "Edit Artikel Blog"}
            </h1>
            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Editor TinyMCE &bull; SEO Real-time Assistant &bull; Vercel Blob Storage
            </p>
          </div>
        </div>

        {/* Quick action bar */}
        <div className="flex items-center gap-2">
          {initialData && (
            <Link
              href={`/blog/${initialData.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <Eye className="size-3.5" />
              <span>Live Preview</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => handleSubmit("draft", true)}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="size-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("published")}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-mono font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Send className="size-3.5" />
                <span>{status === "published" || mode === "create" ? "Publish Post" : "Update & Publish"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-900/50">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Core Blog Content (7 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug Card */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-6 space-y-4 shadow-2xs">
            <div className="space-y-1.5">
              <label htmlFor="blog-post-title" className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <input
                id="blog-post-title"
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Panduan Komprehensif Next.js 15 & Server Actions"
                className="w-full px-4 py-2.5 text-base font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="blog-post-slug" className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  URL Slug:
                </label>
                {!isSlugManual && (
                  <button
                    type="button"
                    onClick={() => setIsSlugManual(true)}
                    className="text-[11px] font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 underline cursor-pointer"
                  >
                    Edit Manual Slug
                  </button>
                )}
              </div>
              <div className="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden text-xs font-mono">
                <span className="px-3 py-2 text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800/50 border-r border-neutral-200 dark:border-neutral-800 shrink-0">
                  /blog/
                </span>
                <input
                  id="blog-post-slug"
                  type="text"
                  value={slug}
                  disabled={!isSlugManual}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(e.target.value);
                  }}
                  className="w-full px-3 py-2 bg-transparent text-neutral-900 dark:text-neutral-100 focus:outline-none disabled:opacity-75"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between">
                <label htmlFor="blog-post-excerpt" className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  Ringkasan / Excerpt <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-400">
                  {excerpt.length} karakter
                </span>
              </div>
              <textarea
                id="blog-post-excerpt"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tuliskan ringkasan singkat artikel yang memikat pembaca..."
                className="w-full px-4 py-2.5 text-xs font-sans rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                required
              />
            </div>
          </div>

          {/* TinyMCE Rich Content Editor */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-6 shadow-2xs">
            <TinyMceEditor value={content} onChange={setContent} />
          </div>

          {/* SEO Assistant Component */}
          <SeoAssistant
            analysis={seoAnalysis}
            focusKeyword={focusKeyword}
            onFocusKeywordChange={setFocusKeyword}
            seoTitle={seoTitle}
            onSeoTitleChange={setSeoTitle}
            seoDescription={seoDescription}
            onSeoDescriptionChange={setSeoDescription}
            seoKeywords={seoKeywords}
            onSeoKeywordsChange={setSeoKeywords}
            slug={slug}
            fallbackTitle={title}
            fallbackExcerpt={excerpt}
          />
        </div>

        {/* Right Column: Publishing, Thumbnail & Metadata (4 Cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {/* Publish Action Card */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Send className="size-4 text-neutral-500" />
                <span>Pengaturan Publikasi</span>
              </h3>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider",
                  status === "published"
                    ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                )}
              >
                {status}
              </span>
            </div>

            {/* Status Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-600 dark:text-neutral-400">Status Artikel:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={cn(
                    "py-2 px-3 rounded-lg text-xs font-mono font-medium border text-center transition-all cursor-pointer",
                    status === "draft"
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 shadow-2xs"
                      : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300"
                  )}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={cn(
                    "py-2 px-3 rounded-lg text-xs font-mono font-medium border text-center transition-all cursor-pointer",
                    status === "published"
                      ? "bg-emerald-600 text-white dark:bg-emerald-500 dark:text-neutral-950 border-emerald-600 dark:border-emerald-500 shadow-2xs font-bold"
                      : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300"
                  )}
                >
                  Published
                </button>
              </div>
            </div>

            {/* Published Date */}
            <div className="space-y-1.5">
              <label htmlFor="publish-date-input" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Calendar className="size-3.5 text-neutral-400" />
                <span>Tanggal Publikasi:</span>
              </label>
              <input
                id="publish-date-input"
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label htmlFor="author-input" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <User className="size-3.5 text-neutral-400" />
                <span>Penulis (Author):</span>
              </label>
              <input
                id="author-input"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>

            {/* SEO Quick Badge */}
            <div className="p-3 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                  <Sparkles className="size-3.5 text-neutral-500" />
                  SEO Score:
                </span>
                <span className={cn("font-bold", seoAnalysis.ratingColor.text)}>
                  {seoAnalysis.score}/100 ({seoAnalysis.rating})
                </span>
              </div>
              <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-300", seoAnalysis.ratingColor.progressBar)}
                  style={{ width: `${Math.max(5, seoAnalysis.score)}%` }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => handleSubmit("published")}
                disabled={isPending}
                className="w-full py-2.5 px-4 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-mono font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Menyimpan Data...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>{mode === "create" ? "Terbitkan Artikel" : "Perbarui & Terbitkan"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSubmit("draft", true)}
                disabled={isPending}
                className="w-full py-2 px-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Save className="size-3.5" />
                <span>Simpan sebagai Draft</span>
              </button>
            </div>
          </div>

          {/* Thumbnail Upload Card */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5 shadow-2xs">
            <ThumbnailUpload
              value={thumbnail}
              altText={thumbnailAlt}
              onChange={(url, alt) => {
                setThumbnail(url);
                if (alt) setThumbnailAlt(alt);
              }}
              onAltChange={setThumbnailAlt}
            />
          </div>

          {/* Category & Tags Card */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5 space-y-4 shadow-2xs">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Folder className="size-3.5 text-neutral-500" />
              <span>Kategori & Tags</span>
            </h3>

            {/* Category selection */}
            <div className="space-y-1.5">
              <label htmlFor="blog-category-select" className="text-xs font-mono text-neutral-600 dark:text-neutral-400">Pilih Kategori:</label>
              <select
                id="blog-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none"
              >
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="custom">+ Kategori Kustom</option>
              </select>

              {category === "custom" && (
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Ketik kategori baru..."
                  className="w-full mt-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
              )}
            </div>

            {/* Tags management */}
            <div className="space-y-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <label htmlFor="tag-input-field" className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Tag className="size-3 text-neutral-400" />
                <span>Tags:</span>
              </label>

              <div className="flex gap-2">
                <input
                  id="tag-input-field"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Tambah tag..."
                  className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 text-xs font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer shrink-0"
                >
                  Tambah
                </button>
              </div>

              {/* Tags chip list */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-neutral-400 hover:text-red-500 cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Low SEO Warning Modal (Non-blocking: User can still proceed) */}
      {showLowSeoWarningModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <AlertTriangle className="size-6" />
            </div>

            <div>
              <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                SEO Score Rendah ({seoAnalysis.score}/100)
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                Skor SEO artikel Anda berada di bawah rekomendasi minimum (60/100). Memperbaiki rekomendasi pada SEO Assistant akan membantu artikel mendapatkan peringkat lebih tinggi di Google.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLowSeoWarningModal(false)}
                className="flex-1 py-2 px-4 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                Kembali & Perbaiki SEO
              </button>
              <button
                type="button"
                onClick={() => handleSubmit("published", true)}
                className="flex-1 py-2 px-4 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-mono font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
              >
                Tetap Terbitkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
