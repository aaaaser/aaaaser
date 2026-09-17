import { getSiteSettings } from "@/lib/db";
import { SettingsEditorForm } from "./settings-editor-form";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
          Admin &bull; Configuration
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
          Site & SEO Configuration
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Customize website headline texts, hero description, meta tags, and global footer.
        </p>
      </div>

      <SettingsEditorForm initialSettings={settings} />
    </div>
  );
}
