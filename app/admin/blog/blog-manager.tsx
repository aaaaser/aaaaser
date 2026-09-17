"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  saveBlogPostAdminAction,
  deleteBlogPostAdminAction,
  toggleBlogPostPublishedAction,
} from "@/app/actions";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Eye,
  EyeOff,
  X,
} from "lucide-react";
import { BlogPostItem } from "@/components/blog-card";

export function BlogManager({ initialPosts }: { initialPosts: BlogPostItem[] }) {
  const [posts, setPosts] = useState<BlogPostItem[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPostItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [tagsInput, setTagsInput] = useState("");
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCoverImageUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80");
    setCategory("Engineering");
    setTagsInput("architecture, nextjs, drizzle, typescript");
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPostItem) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCoverImageUrl(post.coverImageUrl);
    setCategory(post.category);
    setTagsInput(post.tags.join(", "));
    setPublished(post.published);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await saveBlogPostAdminAction({
        id: editingPost?.id,
        title,
        slug,
        excerpt,
        content,
        coverImageUrl,
        category,
        tags,
        published,
      });

      if (editingPost?.id) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === editingPost.id
              ? {
                  ...p,
                  title,
                  slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  excerpt,
                  content,
                  coverImageUrl,
                  category,
                  tags,
                  published,
                }
              : p
          )
        );
      } else {
        const newPost: BlogPostItem = {
          id: Date.now(),
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          excerpt,
          content,
          coverImageUrl,
          category,
          tags,
          readingTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`,
          published,
          publishedAt: new Date(),
        };
        setPosts((prev) => [newPost, ...prev]);
      }

      setFeedback({ type: "success", text: "Artikel berhasil disimpan!" });
      setIsModalOpen(false);
    } catch {
      setFeedback({ type: "error", text: "Gagal menyimpan artikel." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus artikel ini dari database?")) return;

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
        prev.map((p) => (p.id === id ? { ...p, published: !current } : p))
      );
    } catch {
      alert("Gagal memperbarui status publikasi artikel.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono text-neutral-500">
          Total {posts.length} articles in database
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
          }`}
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
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 text-neutral-500">
              <tr>
                <th className="p-4">Article</th>
                <th className="p-4">Category</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                          <span>{post.title}</span>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                          >
                            <ExternalLink className="size-3" />
                          </Link>
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                    {post.category}
                  </td>
                  <td className="p-4 text-neutral-500 whitespace-nowrap">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(post.id, post.published)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer ${
                        post.published
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                      }`}
                    >
                      {post.published ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                      <span>{post.published ? "Published" : "Draft"}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(post)}
                        className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 cursor-pointer"
                        title="Edit Article"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {editingPost ? "Edit Artikel" : "Tulis Artikel Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Full-Stack Architecture in 2026"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="modern-full-stack-architecture-2026"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Engineering / Frontend / Architecture"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Tags (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="nextjs, drizzle, architecture, react"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Short Excerpt *
                </label>
                <input
                  type="text"
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise summary of what this article discusses..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Article Body Content *
                </label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write the article paragraphs, thoughts, code explanations..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Published (Publicly Visible)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-300 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
                  <span>Simpan Artikel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
