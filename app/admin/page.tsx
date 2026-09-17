import Link from "next/link";
import {
  getDashboardStats,
  getContactMessages,
  getProjects,
  getProfile,
} from "@/lib/db";
import {
  FolderGit2,
  BookOpen,
  Mail,
  User,
  Database,
  ArrowUpRight,
  Plus,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [stats, messages, projects, profile] = await Promise.all([
    getDashboardStats(),
    getContactMessages(),
    getProjects(),
    getProfile(),
  ]);

  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
            Overview
          </div>
          <h1 className="text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
            Portfolio Management
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Manage projects, blog articles, tech stack, messages, and portfolio details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
          >
            <Plus className="size-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-mono font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Plus className="size-3.5" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Database Connection Status Banner */}
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
            <Database className="size-4" />
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>Database Engine:</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {hasDatabaseUrl ? "Neon PostgreSQL (Production)" : "Active Dev Store (Drizzle Ready)"}
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-[11px] mt-0.5">
              {hasDatabaseUrl
                ? "Connected directly to Neon Serverless PostgreSQL with Drizzle ORM."
                : "Using high-speed resilient in-memory store initialized with seed data. To connect live PostgreSQL, set DATABASE_URL in Vercel / .env."}
            </p>
          </div>
        </div>
        <Link
          href="/admin/settings"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium whitespace-nowrap"
        >
          Settings &rarr;
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Card */}
        <Link
          href="/admin/projects"
          className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <FolderGit2 className="size-5 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
            <span className="text-[10px] font-mono uppercase">Projects</span>
          </div>
          <div className="text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mb-1">
            {stats.totalProjects}
          </div>
          <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            <span>{stats.publishedProjects} published</span>
            <span>&bull;</span>
            <span className="text-neutral-400">{stats.totalProjects - stats.publishedProjects} drafts</span>
          </div>
        </Link>

        {/* Blog Posts Card */}
        <Link
          href="/admin/blog"
          className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <BookOpen className="size-5 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
            <span className="text-[10px] font-mono uppercase">Articles</span>
          </div>
          <div className="text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mb-1">
            {stats.totalBlogPosts}
          </div>
          <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            <span>{stats.publishedPosts} published</span>
            <span>&bull;</span>
            <span className="text-neutral-400">{stats.totalBlogPosts - stats.publishedPosts} drafts</span>
          </div>
        </Link>

        {/* Messages Card */}
        <Link
          href="/admin/messages"
          className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <Mail className="size-5 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
            <span className="text-[10px] font-mono uppercase">Inbox</span>
          </div>
          <div className="text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-100 mb-1">
            {stats.totalMessages}
          </div>
          <div className="text-xs font-mono text-neutral-500 flex items-center gap-1">
            {stats.unreadMessages > 0 ? (
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                {stats.unreadMessages} unread messages
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400">All messages read</span>
            )}
          </div>
        </Link>

        {/* Profile Card */}
        <Link
          href="/admin/profile"
          className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-3">
            <User className="size-5 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
            <span className="text-[10px] font-mono uppercase">Profile</span>
          </div>
          <div className="text-lg font-bold font-mono text-neutral-900 dark:text-neutral-100 truncate mb-1">
            {profile.name}
          </div>
          <div className="text-xs font-mono text-neutral-500 truncate">
            {profile.roleTitle}
          </div>
        </Link>
      </div>

      {/* Two Column Section: Recent Messages & Quick Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
            <h3 className="font-bold font-mono text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Mail className="size-4" />
              <span>Recent Inquiries</span>
            </h3>
            <Link
              href="/admin/messages"
              className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              View all &rarr;
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 font-mono text-xs">
              No inquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.slice(0, 4).map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-mono flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{msg.name}</span>
                      <span className="text-[10px] text-neutral-400">&lt;{msg.email}&gt;</span>
                    </div>
                    <div className="font-medium text-neutral-700 dark:text-neutral-300 truncate max-w-sm">
                      {msg.subject}
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1">
                      {msg.message}
                    </div>
                  </div>

                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                      msg.status === "unread"
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                        : msg.status === "replied"
                        ? "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Projects List */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-900 pb-3">
            <h3 className="font-bold font-mono text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <FolderGit2 className="size-4" />
              <span>Projects Showcase</span>
            </h3>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Manage all &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-lg border border-neutral-200/70 dark:border-neutral-800/70 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs font-mono flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <span>{p.title}</span>
                    {p.featured && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{p.category}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      p.published ? "bg-emerald-500" : "bg-neutral-400"
                    }`}
                  />
                  <Link
                    href={`/projects/${p.slug}`}
                    target="_blank"
                    className="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  >
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
