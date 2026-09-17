"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  BookOpen,
  Code2,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Profile & Bio", href: "/admin/profile", icon: User },
  { label: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { label: "Blog / Articles", href: "/admin/blog", icon: BookOpen },
  { label: "Tech Stack", href: "/admin/tech-stack", icon: Code2 },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Site & SEO", href: "/admin/settings", icon: Settings },
];

export function AdminNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col justify-between shrink-0">
      {/* Top Header */}
      <div>
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-mono font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
            <div className="size-6 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center">
              <Shield className="size-3.5" />
            </div>
            <span>Portfolio Admin</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors",
                  isActive
                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-2xs font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-100"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Info & Logout */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="size-3.5" />
            View Live Site
          </span>
          <span className="text-[10px] text-neutral-400">&rarr;</span>
        </Link>

        <div className="px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 text-xs font-mono">
          <div className="text-[10px] text-neutral-400 uppercase">Logged in as</div>
          <div className="text-neutral-800 dark:text-neutral-200 truncate font-medium text-[11px]">
            {userEmail || "admin@example.com"}
          </div>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="size-3.5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
