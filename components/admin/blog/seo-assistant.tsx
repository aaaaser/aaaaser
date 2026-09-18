"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  Globe,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  KeyRound,
  FileText,
  AlignLeft,
  Tag,
} from "lucide-react";
import { SeoAnalysisResult, SeoCheckItem } from "@/lib/seo/rules";
import { cn } from "@/lib/utils";

interface SeoAssistantProps {
  analysis: SeoAnalysisResult;
  focusKeyword: string;
  onFocusKeywordChange: (val: string) => void;
  seoTitle: string;
  onSeoTitleChange: (val: string) => void;
  seoDescription: string;
  onSeoDescriptionChange: (val: string) => void;
  seoKeywords: string;
  onSeoKeywordsChange: (val: string) => void;
  slug: string;
  fallbackTitle: string;
  fallbackExcerpt: string;
}

export function SeoAssistant({
  analysis,
  focusKeyword,
  onFocusKeywordChange,
  seoTitle,
  onSeoTitleChange,
  seoDescription,
  onSeoDescriptionChange,
  seoKeywords,
  onSeoKeywordsChange,
  slug,
  fallbackTitle,
  fallbackExcerpt,
}: SeoAssistantProps) {
  const [activeTab, setActiveTab] = useState<"fields" | "checklist" | "preview">("fields");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const displayTitle = (seoTitle || fallbackTitle || "Judul Artikel").trim();
  const displaySnippet = (seoDescription || fallbackExcerpt || "Deskripsi ringkasan artikel akan tampil di sini pada hasil pencarian Google.").trim();
  const displaySlug = slug || "slug-artikel";

  // Categorize checks
  const categories = [
    { key: "title", label: "Title & Heading" },
    { key: "meta", label: "Meta Description" },
    { key: "keyword", label: "Kata Kunci & Fokus" },
    { key: "content", label: "Kualitas Konten" },
    { key: "headings", label: "Struktur Heading" },
    { key: "image", label: "Gambar & Thumbnail" },
    { key: "links", label: "Tautan (Links)" },
    { key: "readability", label: "Keterbacaan" },
  ];

  const titleLength = displayTitle.length;
  const metaLength = displaySnippet.length;

  const passedCount = analysis.checks.filter((c) => c.status === "passed").length;
  const warningCount = analysis.checks.filter((c) => c.status === "warning").length;
  const failedCount = analysis.checks.filter((c) => c.status === "failed").length;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5 space-y-5 shadow-2xs">
      {/* Header & SEO Score Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100">
                SEO Assistant & Analyzer
              </h3>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Optimasi Real-Time Standar Mesin Pencari
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider",
                analysis.ratingColor.badge
              )}
            >
              {analysis.score}/100 &bull; {analysis.rating}
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <div
              className={cn("h-full transition-all duration-500 rounded-full", analysis.ratingColor.progressBar)}
              style={{ width: `${Math.max(4, analysis.score)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <CheckCircle2 className="size-3" /> {passedCount} Lulus
              </span>
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                <AlertTriangle className="size-3" /> {warningCount} Perlu Ditinjau
              </span>
              <span className="text-red-600 dark:text-red-400 flex items-center gap-0.5">
                <XCircle className="size-3" /> {failedCount} Kurang
              </span>
            </div>
            <span>{analysis.wordCount} Kata &bull; ~{analysis.readingTimeMinutes} mnt baca</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("fields")}
          className={cn(
            "pb-2 text-xs font-mono font-semibold transition-colors relative cursor-pointer",
            activeTab === "fields"
              ? "text-neutral-950 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
          )}
        >
          Kolom Metadata SEO
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={cn(
            "pb-2 text-xs font-mono font-semibold transition-colors relative cursor-pointer flex items-center gap-1.5",
            activeTab === "preview"
              ? "text-neutral-950 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
          )}
        >
          <Search className="size-3" />
          Google Snippet Preview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("checklist")}
          className={cn(
            "pb-2 text-xs font-mono font-semibold transition-colors relative cursor-pointer flex items-center gap-1.5",
            activeTab === "checklist"
              ? "text-neutral-950 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px"
              : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
          )}
        >
          <CheckCircle2 className="size-3" />
          Checklist ({passedCount}/{analysis.checks.length})
        </button>
      </div>

      {/* Tab 1: SEO Fields */}
      {activeTab === "fields" && (
        <div className="space-y-4 pt-1">
          {/* Focus Keyword */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="seo-focus-keyword" className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <KeyRound className="size-3.5 text-neutral-500" />
                <span>Focus Keyword (Kata Kunci Utama)</span>
              </label>
              {analysis.keywordDensity > 0 && (
                <span className="text-[11px] font-mono text-neutral-500">
                  Kepadatan: {analysis.keywordDensity.toFixed(1)}%
                </span>
              )}
            </div>
            <input
              id="seo-focus-keyword"
              type="text"
              value={focusKeyword}
              onChange={(e) => onFocusKeywordChange(e.target.value)}
              placeholder="Contoh: Next.js App Router, Tailwind CSS"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Kata kunci spesifik yang menjadi target utama pencarian pengguna di Google.
            </p>
          </div>

          {/* SEO Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="seo-title-field" className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <FileText className="size-3.5 text-neutral-500" />
                <span>SEO Title (Judul Mesin Pencari)</span>
              </label>
              <span
                className={cn(
                  "text-[11px] font-mono font-medium",
                  titleLength >= 40 && titleLength <= 60
                    ? "text-emerald-600 dark:text-emerald-400"
                    : titleLength > 60
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-neutral-400"
                )}
              >
                {titleLength}/60 karakter {titleLength >= 40 && titleLength <= 60 && "(Optimal)"}
              </span>
            </div>
            <input
              id="seo-title-field"
              type="text"
              value={seoTitle}
              onChange={(e) => onSeoTitleChange(e.target.value)}
              placeholder={fallbackTitle || "Masukkan SEO Title khusus (opsional)..."}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Jika dikosongkan, judul artikel di atas akan digunakan sebagai title bawaan.
            </p>
          </div>

          {/* SEO Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="seo-desc-field" className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                <AlignLeft className="size-3.5 text-neutral-500" />
                <span>Meta Description (Ringkasan Cuplikan)</span>
              </label>
              <span
                className={cn(
                  "text-[11px] font-mono font-medium",
                  metaLength >= 120 && metaLength <= 160
                    ? "text-emerald-600 dark:text-emerald-400"
                    : metaLength > 160
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-neutral-400"
                )}
              >
                {metaLength}/160 karakter {metaLength >= 120 && metaLength <= 160 && "(Optimal)"}
              </span>
            </div>
            <textarea
              id="seo-desc-field"
              rows={3}
              value={seoDescription}
              onChange={(e) => onSeoDescriptionChange(e.target.value)}
              placeholder={fallbackExcerpt || "Tuliskan deskripsi ringkas yang menarik pembaca (120-160 karakter)..."}
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Deskripsi ini muncul di bawah judul pada cuplikan hasil pencarian Google.
            </p>
          </div>

          {/* SEO Keywords (comma separated) */}
          <div className="space-y-1.5">
            <label htmlFor="seo-keywords-field" className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Tag className="size-3.5 text-neutral-500" />
              <span>SEO Keywords (Kata Kunci Turunan)</span>
            </label>
            <input
              id="seo-keywords-field"
              type="text"
              value={seoKeywords}
              onChange={(e) => onSeoKeywordsChange(e.target.value)}
              placeholder="Pisahkan dengan koma, contoh: react, performance, web design"
              className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>
        </div>
      )}

      {/* Tab 2: Google Search Live Preview */}
      {activeTab === "preview" && (
        <div className="space-y-3 pt-1">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4 space-y-2">
            {/* Header info */}
            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-sans">
              <div className="size-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                <Globe className="size-3.5" />
              </div>
              <div className="truncate">
                <div className="text-[12px] font-medium text-neutral-900 dark:text-neutral-200">Alex Rivera &bull; Portfolio</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                  https://alexrivera.dev/blog/{displaySlug}
                </div>
              </div>
            </div>

            {/* Google Title */}
            <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer line-clamp-2 leading-snug">
              {displayTitle}
            </h4>

            {/* Google Snippet */}
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 line-clamp-3 leading-relaxed">
              {focusKeyword ? (
                // Highlight keyword if present
                displaySnippet.split(new RegExp(`(${focusKeyword})`, "gi")).map((part, i) =>
                  part.toLowerCase() === focusKeyword.toLowerCase() ? (
                    <strong key={i} className="font-semibold text-neutral-950 dark:text-white">
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )
              ) : (
                displaySnippet
              )}
            </p>
          </div>

          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <HelpCircle className="size-3.5 shrink-0" />
            <span>Pratinjau tampilan desktop Google. Penampilan aktual dapat bervariasi sesuai algoritma Google.</span>
          </div>
        </div>
      )}

      {/* Tab 3: Detailed Checklist */}
      {activeTab === "checklist" && (
        <div className="space-y-3 pt-1">
          {categories.map((cat) => {
            const items = analysis.checks.filter((c) => c.category === cat.key);
            if (items.length === 0) return null;

            const isExpanded = expandedCategory === cat.key || expandedCategory === "all";

            const catScore = items.reduce((s, i) => s + i.pointsEarned, 0);
            const catMax = items.reduce((s, i) => s + i.maxPoints, 0);

            return (
              <div
                key={cat.key}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.key)}
                  className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                      {cat.label}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      ({catScore}/{catMax} poin)
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="size-4 text-neutral-400" /> : <ChevronDown className="size-4 text-neutral-400" />}
                </button>

                {isExpanded && (
                  <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-2 space-y-2">
                    {items.map((item: SeoCheckItem) => (
                      <div key={item.id} className="pt-2 first:pt-0 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            {item.status === "passed" && (
                              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            )}
                            {item.status === "warning" && (
                              <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            )}
                            {item.status === "failed" && (
                              <XCircle className="size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                                {item.label}
                              </span>
                              <p className="text-[11px] font-sans text-neutral-600 dark:text-neutral-400">
                                {item.message}
                              </p>
                              {item.status !== "passed" && item.recommendation && (
                                <p className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400 italic mt-0.5">
                                  Saran: {item.recommendation}
                                </p>
                              )}
                            </div>
                          </div>
                          <span
                            className={cn(
                              "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                              item.status === "passed"
                                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                                : item.status === "warning"
                                ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                                : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                            )}
                          >
                            +{item.pointsEarned}/{item.maxPoints}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
