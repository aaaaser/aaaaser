"use client";

import React, { useActionState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAction } from "@/app/actions";
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, AlertCircle, Sparkles } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm">
      {/* Brand & Header */}
      <div className="text-center mb-8">
        <div className="size-12 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="size-6" />
        </div>
        <h1 className="text-2xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
          Admin Authentication
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Sign in to manage portfolio content, projects, and articles.
        </p>
      </div>

      {/* Error alert */}
      {state?.error && (
        <div className="mb-6 p-3.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200 text-xs flex items-start gap-2.5 font-mono">
          <AlertCircle className="size-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Login Form */}
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div>
          <label htmlFor="email" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="admin@example.com"
              placeholder="admin@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-colors"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue="admin123456"
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-medium text-sm font-mono hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all disabled:opacity-50 cursor-pointer shadow-xs"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Verifying credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      {/* Quick Demo Credentials Info */}
      <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-900 text-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 dark:bg-neutral-900 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
          <Sparkles className="size-3 text-neutral-500" />
          <span>Demo: admin@example.com / admin123456</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline transition-colors"
        >
          &larr; Back to Portfolio
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-neutral-500 font-mono text-sm">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
