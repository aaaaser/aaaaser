import { getTechnologies } from "@/lib/db";
import { TechStackManager } from "./tech-stack-manager";

export const revalidate = 0;

export default async function AdminTechStackPage() {
  const technologies = await getTechnologies();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
          Admin &bull; Skills
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
          Tech Stack & Skills Management
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Add, reorder, categorize, and update technologies and frameworks shown on the portfolio.
        </p>
      </div>

      <TechStackManager initialTechnologies={technologies} />
    </div>
  );
}
