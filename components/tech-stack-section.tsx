"use client";

import React, { useState } from "react";
import { DynamicIcon } from "./dynamic-icon";
import { getTechMeta } from "./tech-logos";
import { cn } from "@/lib/utils";

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

interface TechStackSectionProps {
  technologies: Technology[];
}

export function TechStackSection({ technologies }: TechStackSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps & Cloud", "Tools"];

  const filteredTechs =
    selectedCategory === "All"
      ? technologies
      : technologies.filter((t) => {
          if (selectedCategory === "DevOps & Cloud") {
            return t.category.toLowerCase().includes("cloud") || t.category.toLowerCase().includes("devops");
          }
          return t.category.toLowerCase() === selectedCategory.toLowerCase();
        });

  return (
    <section id="tech-stack" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
            <span className="size-1.5 rounded-full bg-neutral-400" />
            <span>Tech Stack & Tools</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Engineered with modern technologies.
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all font-medium whitespace-nowrap cursor-pointer",
                selectedCategory === cat
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs font-semibold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTechs.map((tech) => {
          const meta = getTechMeta(tech.name, tech.iconName);
          const isHovered = hoveredId === tech.id;

          return (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredId(tech.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderColor: isHovered ? meta.color : undefined,
                boxShadow: isHovered ? `0 4px 20px -2px ${meta.color}25` : undefined,
              }}
              className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800/90 bg-white dark:bg-neutral-950 p-5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    style={{
                      backgroundColor: isHovered ? `${meta.color}18` : undefined,
                      borderColor: isHovered ? meta.color : undefined,
                      color: isHovered ? meta.color : undefined,
                    }}
                    className="size-11 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:scale-110 transition-all duration-300"
                  >
                    <DynamicIcon
                      techName={tech.name}
                      name={tech.iconName}
                      className="size-5 transition-colors duration-300"
                      style={{ color: isHovered ? meta.color : undefined }}
                    />
                  </div>
                  <span
                    style={{
                      borderColor: isHovered ? `${meta.color}40` : undefined,
                      color: isHovered ? meta.color : undefined,
                    }}
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors"
                  >
                    {tech.proficiency || "Advanced"}
                  </span>
                </div>

                <h3
                  style={{ color: isHovered ? meta.color : undefined }}
                  className="font-bold text-base text-neutral-900 dark:text-neutral-100 mb-1 font-mono tracking-tight transition-colors duration-200"
                >
                  {tech.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {tech.description || ""}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{tech.category}</span>
                <span
                  style={{ color: isHovered ? meta.color : undefined }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-200 font-medium"
                >
                  Active &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

