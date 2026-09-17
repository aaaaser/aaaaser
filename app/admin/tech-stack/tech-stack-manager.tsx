"use client";

import React, { useState } from "react";
import {
  saveTechnologyAdminAction,
  deleteTechnologyAdminAction,
} from "@/app/actions";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";

export interface Technology {
  id: number;
  name: string;
  iconName: string;
  category: string;
  description?: string | null;
  displayOrder: number;
  proficiency?: string | null;
  featured: boolean;
}

export function TechStackManager({ initialTechnologies }: { initialTechnologies: Technology[] }) {
  const [technologies, setTechnologies] = useState<Technology[]>(initialTechnologies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Partial<Technology> | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [iconName, setIconName] = useState("Code2");
  const [category, setCategory] = useState("Frontend");
  const [description, setDescription] = useState("");
  const [proficiency, setProficiency] = useState("Advanced");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [featured, setFeatured] = useState(true);

  const openCreateModal = () => {
    setEditingTech(null);
    setName("");
    setIconName("Code2");
    setCategory("Frontend");
    setDescription("");
    setProficiency("Advanced");
    setDisplayOrder(technologies.length + 1);
    setFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (tech: Technology) => {
    setEditingTech(tech);
    setName(tech.name);
    setIconName(tech.iconName);
    setCategory(tech.category);
    setDescription(tech.description || "");
    setProficiency(tech.proficiency || "Advanced");
    setDisplayOrder(tech.displayOrder);
    setFeatured(tech.featured);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      await saveTechnologyAdminAction({
        id: editingTech?.id,
        name,
        iconName,
        category,
        description,
        proficiency,
        displayOrder,
        featured,
      });

      if (editingTech?.id) {
        setTechnologies((prev) =>
          prev.map((t) =>
            t.id === editingTech.id
              ? {
                  ...t,
                  name,
                  iconName,
                  category,
                  description,
                  proficiency,
                  displayOrder,
                  featured,
                }
              : t
          )
        );
      } else {
        const newT: Technology = {
          id: Date.now(),
          name,
          iconName,
          category,
          description,
          proficiency,
          displayOrder,
          featured,
        };
        setTechnologies((prev) => [...prev, newT]);
      }

      setFeedback({ type: "success", text: "Skill / Tech berhasil disimpan!" });
      setIsModalOpen(false);
    } catch {
      setFeedback({ type: "error", text: "Gagal menyimpan skill." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus skill ini dari database?")) return;

    try {
      await deleteTechnologyAdminAction(id);
      setTechnologies((prev) => prev.filter((t) => t.id !== id));
      setFeedback({ type: "success", text: "Skill berhasil dihapus." });
    } catch {
      setFeedback({ type: "error", text: "Gagal menghapus skill." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-xs font-mono text-neutral-500">
          Total {technologies.length} skills & technologies
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>Tambah Tech / Skill</span>
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

      {/* Grid of technologies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {technologies.map((tech) => (
          <div
            key={tech.id}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="size-9 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-neutral-100">
                  <DynamicIcon techName={tech.name} name={tech.iconName} className="size-4" />
                </div>
                {tech.proficiency && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {tech.proficiency}
                  </span>
                )}
              </div>

              <div className="font-bold text-sm font-mono text-neutral-900 dark:text-neutral-100 mb-1">
                {tech.name}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono mb-2">
                {tech.category}
              </div>
              {tech.description && (
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                  {tech.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
              <span className="text-[10px] font-mono text-neutral-400">Order: #{tech.displayOrder}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(tech)}
                  className="p-1 rounded text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
                  title="Edit Tech"
                >
                  <Edit2 className="size-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(tech.id)}
                  className="p-1 rounded text-red-500 hover:text-red-700 cursor-pointer"
                  title="Delete Tech"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden my-8">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                {editingTech ? "Edit Tech / Skill" : "Tambah Tech / Skill"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Technology Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Next.js, PostgreSQL, Docker"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Lucide Icon Name
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={iconName}
                      onChange={(e) => setIconName(e.target.value)}
                      placeholder="Code2, Server, Database..."
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                    />
                    <div className="size-9 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0">
                      <DynamicIcon name={iconName} className="size-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Proficiency Level
                  </label>
                  <input
                    type="text"
                    value={proficiency}
                    onChange={(e) => setProficiency(e.target.value)}
                    placeholder="Expert / Advanced / Proficient"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                    Display Order (1, 2, 3...)
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1 font-medium">
                  Short Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. React framework for production with SSR & RSC."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
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
                  <span>Simpan Tech</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
