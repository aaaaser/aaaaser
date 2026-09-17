import { getProfile } from "@/lib/db";
import { ProfileEditorForm } from "./profile-editor-form";

export const revalidate = 0;

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
          Admin &bull; Personal Details
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
          Profile & Bio Management
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Update your public profile, about section, avatar, resume URL, contact info, and availability.
        </p>
      </div>

      <ProfileEditorForm initialProfile={profile} />
    </div>
  );
}
