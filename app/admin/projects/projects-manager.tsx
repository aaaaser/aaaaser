"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  saveProjectAdminAction,
  deleteProjectAdminAction,
  toggleProjectPublishedAction,
  toggleProjectFeaturedAction,
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
  Star,
  X,
} from "lucide-react";
import { ProjectItem } from "@/components/project-card";

export function ProjectsManager({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Web Application");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [techInput, setTechInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setDescription("");
    setImageUrl("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80");
    setCategory("Full-Stack");
    setGithubUrl("");
    setDemoUrl("");
    setTechInput("Next.js, TypeScript, Tailwind CSS, PostgreSQL");
    setFeatured(false);
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setTitle(project.title);
    setSlug(project.slug);
    setExcerpt(project.excerpt);
    setDescription(project.description);
    setImageUrl(project.imageUrl);
    setCategory(project.category);
    setGithubUrl(project.githubUrl || "");
    setDemoUrl(project.demoUrl || "");
    setTechInput(project.technologies.join(", "));
    setFeatured(project.featured);
    setPublished(project.published);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const technologies = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      await saveProjectAdminAction({
        id: editingProject?.id,
        title,
        slug,
        excerpt,
        description,
        imageUrl,
        category,
        githubUrl,
        demoUrl,
        technologies,
        featured,
        published,
        displayOrder: editingProject?.id ? 1 : projects.length + 1,
      });

      if (editingProject?.id) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === editingProject.id
              ? {
                  ...p,
                  title,
                  slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  excerpt,
                  description,
                  imageUrl,
                  category,
                  githubUrl,
                  demoUrl,
                  technologies,
                  featured,
                  published,
                }
              : p
          )
        );
      } else {
        const newProj: ProjectItem = {
          id: Date.now(),
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          excerpt,
          description,
          imageUrl,
          category,
          githubUrl,
          demoUrl,
          technologies,
          featured,
          published,
        };
        setProjects((prev) => [newProj, ...prev]);
      }

      setFeedback({ type: "success", text: "Project berhasil disimpan!" });
      setIsModalOpen(false);
    } catch {
      setFeedback({ type: "error", text: "Gagal menyimpan project." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus project ini dari database?")) return;

    try {
      await deleteProjectAdminAction(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setFeedback({ type: "success", text: "Project berhasil dihapus." });
    } catch {
      setFeedback({ type: "error", text: "Gagal menghapus project." });
    }
  };

  const handleTogglePublished = async (id: number, current: boolean) => {
    try {
      await toggleProjectPublishedAction(id, !current);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !current } : p))
      );
    } catch {
      alert("Gagal memperbarui status publikasi.");
    }
  };

  const handleToggleFeatured = async (id: number, current: boolean) => {
    try {
      await toggleProjectFeaturedAction(id, !current);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured: !current } : p))
      );
    } catch {
      alert("Gagal memperbarui status featured.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono text-neutral-500">
          Total {projects.length} projects in database
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>Tambah Project Baru</span>
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

      {/* Projects Table / List */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 text-neutral-500">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Technologies</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Published</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0 bg-neutral-100 dark:bg-neutral-900">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                          <span>{project.title}</span>
                          <Link
                            href={`/projects/${project.slug}`}
                            target="_blank"
                            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                          >
                            <ExternalLink className="size-3" />
                          </Link>
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-xs">
                          {project.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                    {project.category}
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-neutral-400">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        project.featured
                          ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-400"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-700"
                      }`}
                      title="Toggle Featured"
                    >
                      <Star className={`size-3.5 ${project.featured ? "fill-amber-500" : ""}`} />
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePublished(project.id, project.published)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium cursor-pointer ${
                        project.published
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                      }`}
                    >
                      {project.published ? <Eye className="size-3" /> : <EyeOff className="size-3" />}
                      <span>{project.published ? "Published" : "Draft"}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(project)}
                        className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 cursor-pointer"
                        title="Delete Project"
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

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {editingProject ? "Edit Project" : "Tambah Project Baru"}
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. AI-Powered Code Studio"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Custom Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ai-powered-code-studio"
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
                    placeholder="e.g. Full-Stack / AI Tool / Mobile"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Technologies (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="Next.js, TypeScript, Drizzle, Tailwind"
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
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Short Excerpt (Cards) *
                </label>
                <input
                  type="text"
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A high-performance full-stack web application..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Full Project Description (Detail Page) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed architectural breakdown, challenges solved, features..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="size-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span>Featured on Home Page</span>
                </label>

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
                  <span>Simpan Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
