"use client";

import React, { useState } from "react";
import { updateSiteSettingsAdminAction } from "@/app/actions";
import { Save, CheckCircle2, AlertCircle, Loader2, Settings, Search } from "lucide-react";

export interface SiteSettingsData {
  id?: number;
  siteName: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
}

export function SettingsEditorForm({ initialSettings }: { initialSettings: SiteSettingsData }) {
  const [formData, setFormData] = useState<SiteSettingsData>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await updateSiteSettingsAdminAction(formData);
      setMessage({ type: "success", text: "Site settings and SEO configurations saved to database!" });
    } catch {
      setMessage({ type: "error", text: "Failed to update site settings." });
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

      {/* Hero & General Settings */}
      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-6">
        <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Settings className="size-4" />
          <span>Branding & Hero Section Copy</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Site Brand Name *
            </label>
            <input
              type="text"
              name="siteName"
              required
              value={formData.siteName}
              onChange={handleChange}
              placeholder="e.g. Aaaaser"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Hero Top Badge Text
            </label>
            <input
              type="text"
              name="heroBadge"
              value={formData.heroBadge}
              onChange={handleChange}
              placeholder="e.g. Available for Freelance & Full-time"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Hero Main Headline (First Line) *
            </label>
            <input
              type="text"
              name="heroTitle"
              required
              value={formData.heroTitle}
              onChange={handleChange}
              placeholder="e.g. Building modern digital experiences & software."
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Hero Sub-Headline (Accent Line) *
            </label>
            <input
              type="text"
              name="heroSubtitle"
              required
              value={formData.heroSubtitle}
              onChange={handleChange}
              placeholder="e.g. Developer & Digital Creator"
              className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Hero Description Paragraph *
          </label>
          <textarea
            name="heroDescription"
            rows={3}
            required
            value={formData.heroDescription}
            onChange={handleChange}
            className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Footer Copyright / Signature Text
          </label>
          <input
            type="text"
            name="footerText"
            value={formData.footerText}
            onChange={handleChange}
            placeholder="Designed with precision. Inspired by Vercel & Linear."
            className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>
      </div>

      {/* SEO & Meta */}
      <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-6">
        <h3 className="text-base font-bold font-mono text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <Search className="size-4" />
          <span>Search Engine Optimization (SEO)</span>
        </h3>

        <div>
          <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Meta / SEO Title
          </label>
          <input
            type="text"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            placeholder="Aaaaser — Modern Full-Stack Developer Portfolio"
            className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Meta / SEO Description
          </label>
          <textarea
            name="seoDescription"
            rows={3}
            value={formData.seoDescription}
            onChange={handleChange}
            placeholder="Personal portfolio showcasing full-stack projects, articles on modern web engineering, tech stack, and experience."
            className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
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
            <span>Saving Settings...</span>
          </>
        ) : (
          <>
            <Save className="size-4" />
            <span>Simpan Pengaturan & SEO</span>
          </>
        )}
      </button>
    </form>
  );
}
