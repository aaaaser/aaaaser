"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteBlogPostAdminAction,
  toggleBlogPostPublishedAction,
} from "@/app/actions";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { BlogPostItem } from "@/components/blog-card";
import { cn } from "@/lib/utils";

export function BlogManager({ initialPosts }: { initialPosts: BlogPostItem[] }) {
  const [posts, setPosts] = useState<BlogPostItem[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.focusKeyword && post.focusKeyword.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Hapus artikel "${title}" dari database?`)) return;

    try {
      await deleteBlogPostAdminAction(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setFeedback({ type: "success", text: "Artikel berhasil dihapus." });
    } catch {
      setFeedback({ type: "error", text: "Gagal menghapus artikel." });
    }
  };

  const handleTogglePublished = async (id: number, current: boolean) => {
    try {
      await toggleBlogPostPublishedAction(id, !current);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                published: !current,
                status: !current ? "published" : "draft",
              }
            : p
        )
      );
      setFeedback({
        type: "success",
        text: `Status artikel diubah menjadi ${!current ? "Published" : "Draft"}.`,
      });
    } catch {
      setFeedback({ type: "error", text: "Gagal memperbarui status publikasi artikel." });
    }
  };

  const getSeoBadge = (score?: number | null) => {
    const s = score ?? 0;
    if (s >= 80) {
      return {
        label: `${s}/100 • Excellent`,
        class: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      };
    }
    if (s >= 60) {
      return {
        label: `${s}/100 • Good`,
        class: "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      };
    }
    if (s >= 40) {
      return {
        label: `${s}/100 • Basic`,
        class: "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      };
    }
    return {
      label: `${s}/100 • Needs Improvement`,
      class: "bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
    };
  };

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Cari artikel atau keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 w-60"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <Filter className="size-3.5 text-neutral-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 focus:outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "Semua Kategori" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Link to New Post */}
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-mono font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
        >
          <Plus className="size-3.5" />
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {feedback && (
        <div
          className={cn(
            "p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5",
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
          )}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Posts Table */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 text-neutral-500">
              <tr>
                <th className="p-4">Thumbnail & Artikel</th>
                <th className="p-4">Kategori & Penulis</th>
                <th className="p-4">SEO Score</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">
                    Tidak ada artikel yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => {
                  const seoBadge = getSeoBadge(post.seoScore);
                  const displayThumbnail = post.thumbnail || post.coverImageUrl;

                  return (
                    <tr key={post.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                      {/* Thumbnail & Title */}
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="relative aspect-video w-20 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 bg-neutral-100 dark:bg-neutral-900">
                            {displayThumbnail ? (
                              <Image
                                src={displayThumbnail}
                                alt={post.thumbnailAlt || post.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="size-full flex items-center justify-center text-neutral-400">
                                No Img
                              </div>
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                              <Link
                                href={`/admin/blog/${post.id}/edit`}
                                className="hover:underline hover:text-neutral-600 dark:hover:text-neutral-300"
                              >
                                {post.title}
                              </Link>
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                                title="Lihat Halaman Publik"
                              >
                                <ExternalLink className="size-3" />
                              </Link>
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-1 max-w-sm">
                              {post.excerpt}
                            </div>
                            {post.focusKeyword && (
                              <div className="text-[10px] text-neutral-400">
                                Keyword: <span className="text-neutral-600 dark:text-neutral-300 font-medium">&ldquo;{post.focusKeyword}&rdquo;</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category & Author */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                            {post.category}
                          </span>
                          <div className="text-[11px] text-neutral-400">
                            by {post.author || "Alex Rivera"}
                          </div>
                        </div>
                      </td>

                      {/* SEO Score */}
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border",
                            seoBadge.class
                          )}
                        >
                          <Sparkles className="size-3" />
                          <span>{seoBadge.label}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublished(post.id, post.published)}
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors border",
                            post.published
                              ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700"
                          )}
                          title="Klik untuk mengubah status"
                        >
                          {post.published ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                          <span>{post.published ? "Published" : "Draft"}</span>
                        </button>
                      </td>

                      {/* Date */}
                      <td className="p-4 text-neutral-500 whitespace-nowrap">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/admin/blog/${post.id}/edit`}
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
                            title="Edit Artikel (TinyMCE & SEO)"
                          >
                            <Edit2 className="size-3.5" />
                          </Link>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 transition-colors"
                            title="Lihat Pratinjau Publik"
                          >
                            <ExternalLink className="size-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 cursor-pointer transition-colors"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
