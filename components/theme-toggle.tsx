"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Laptop } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) {
    return (
      <div
        className={`inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 p-0.5 text-xs ${className}`}
      >
        <div className="size-7 rounded-full" />
        <div className="size-7 rounded-full" />
        <div className="size-7 rounded-full" />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 p-0.5 text-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        title="Light Mode"
        className={`flex items-center justify-center size-7 rounded-full transition-all cursor-pointer ${
          theme === "light"
            ? "bg-white text-neutral-900 shadow-xs font-semibold"
            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
        }`}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        title="Dark Mode"
        className={`flex items-center justify-center size-7 rounded-full transition-all cursor-pointer ${
          theme === "dark"
            ? "bg-neutral-800 text-neutral-100 shadow-xs font-semibold"
            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
        }`}
      >
        <Moon className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        aria-label="System preference"
        title="Follow System Theme"
        className={`flex items-center justify-center size-7 rounded-full transition-all cursor-pointer ${
          theme === "system"
            ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold"
            : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
        }`}
      >
        <Laptop className="size-3.5" />
      </button>
    </div>
  );
}


