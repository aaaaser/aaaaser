"use client";

import React, { useState } from "react";
import { updateProfileAdminAction } from "@/app/actions";
import { Save, CheckCircle2, AlertCircle, Loader2, User, Globe } from "lucide-react";

export interface ProfileData {
  name: string;
  roleTitle: string;
  bio: string;
  avatarUrl: string;
  location: string;
  experienceYears: string;
  shortDescription: string;
  resumeUrl?: string | null;
  email: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  availableForWork: boolean;
}

export function ProfileEditorForm({ initialProfile }: { initialProfile: ProfileData }) {
  const [formData, setFormData] = useState<ProfileData>({
    ...initialProfile,
    resumeUrl: initialProfile.resumeUrl || "",
    githubUrl: initialProfile.githubUrl || "",
    linkedinUrl: initialProfile.linkedinUrl || "",
    instagramUrl: initialProfile.instagramUrl || "",
    websiteUrl: initialProfile.websiteUrl || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateProfileAdminAction(formData);
      setMessage({ type: "success", text: "Profile berhasil diperbarui dan disimpan di database!" });
    } catch {
      setMessage({ type: "error", text: "Gagal memperbarui profile. Silakan coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {message && (
        <div
          className={`p-4 rounded-xl border text-xs font-mono flex items-center gap-2.5 ${
            message.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Details Card */}
      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-6">
        <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <User className="size-4" />
          <span>Core Identity & Headlines</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Role / Professional Title *
            </label>
            <input
              type="text"
              name="roleTitle"
              required
              value={formData.roleTitle}
              onChange={handleChange}
              placeholder="e.g. Full Stack Engineer & Digital Creator"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Short Description (Hero & Cards) *
          </label>
          <input
            type="text"
            name="shortDescription"
            required
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Full Bio (About Section) *
          </label>
          <textarea
            name="bio"
            rows={5}
            required
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Jakarta, Indonesia"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Experience Years
            </label>
            <input
              type="text"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="e.g. 5+ Years"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Primary Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
          <div>
            <div className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
              Available for Freelance / Full-Time Work
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Displays glowing status indicator in Hero and About sections.
            </div>
          </div>
          <input
            type="checkbox"
            name="availableForWork"
            checked={formData.availableForWork}
            onChange={(e) => setFormData((prev) => ({ ...prev, availableForWork: e.target.checked }))}
            className="size-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
          />
        </div>
      </div>

      {/* Media & Social Links */}
      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-6">
        <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Globe className="size-4" />
          <span>Avatar, Resume & Social Links</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="url"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Resume / CV Link URL
            </label>
            <input
              type="text"
              name="resumeUrl"
              value={formData.resumeUrl || ""}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl || ""}
              onChange={handleChange}
              placeholder="https://github.com/username"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Instagram URL
            </label>
            <input
              type="url"
              name="instagramUrl"
              value={formData.instagramUrl || ""}
              onChange={handleChange}
              placeholder="https://instagram.com/username"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Website URL
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl || ""}
              onChange={handleChange}
              placeholder="https://mysite.com"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-medium text-xs font-mono hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            <span>Menyimpan perubahan...</span>
          </>
        ) : (
          <>
            <Save className="size-4" />
            <span>Simpan Perubahan Profile</span>
          </>
        )}
      </button>
    </form>
  );
}
