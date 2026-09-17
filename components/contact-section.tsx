"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { submitContactAction, ContactFormState } from "@/app/actions";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

interface ContactSectionProps {
  email: string;
  location: string;
  availableForWork?: boolean;
}

const initialState: ContactFormState = {};

export function ContactSection({
  email,
  location,
  availableForWork = true,
}: ContactSectionProps) {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="flex flex-col gap-2 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
          <span className="size-1.5 rounded-full bg-neutral-400" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Let&apos;s build something great together.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left column: Contact Info & Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
              Direct Contact
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Have a project in mind, an inquiry, or simply want to connect? Send a message through this form or reach out directly.
            </p>

            <div className="space-y-4 pt-2 font-mono text-xs">
              <a
                href={`mailto:${email}`}
                className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
              >
                <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 group-hover:scale-110 transition-transform">
                  <Mail className="size-4" />
                </div>
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase">Email Address</div>
                  <div className="text-neutral-900 dark:text-neutral-100 font-medium text-xs sm:text-sm">{email}</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60">
                <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase">Location</div>
                  <div className="text-neutral-900 dark:text-neutral-100 font-medium text-xs sm:text-sm">{location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200/60 dark:border-neutral-800/60">
                <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase">Availability</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-neutral-900 dark:text-neutral-100 font-medium text-xs sm:text-sm">
                      {availableForWork ? "Open to opportunities & projects" : "Currently occupied"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 sm:p-8">
            <h3 className="text-xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-2">
              <MessageSquare className="size-5" />
              <span>Send a Message</span>
            </h3>

            {state?.success && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold font-mono text-xs uppercase tracking-wider mb-1">Pesan Terkirim!</p>
                  <p className="text-xs sm:text-sm">{state.message}</p>
                </div>
              </div>
            )}

            {state?.error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200 text-sm flex items-start gap-3">
                <AlertCircle className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold font-mono text-xs uppercase tracking-wider mb-1">Gagal Mengirim</p>
                  <p className="text-xs sm:text-sm">{state.error}</p>
                </div>
              </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-sm font-sans transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-sm font-sans transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g. Project Collaboration / Inquiry"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-sm font-sans transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your project, timeline, or whatever you would like to discuss..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-sm font-sans transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-medium text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition-all cursor-pointer font-mono"
              >
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
