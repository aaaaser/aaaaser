"use client";

import React, { useState } from "react";
import {
  updateMessageStatusAdminAction,
  deleteMessageAdminAction,
} from "@/app/actions";
import {
  Trash2,
  Send,
  X,
} from "lucide-react";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
}

export function MessagesManager({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const handleUpdateStatus = async (id: number, status: "unread" | "read" | "replied") => {
    try {
      await updateMessageStatusAdminAction(id, status);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
      }
    } catch {
      alert("Gagal memperbarui status pesan.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus pesan ini secara permanen dari database?")) return;

    try {
      await deleteMessageAdminAction(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch {
      alert("Gagal menghapus pesan.");
    }
  };

  const openMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === "unread") {
      await handleUpdateStatus(msg.id, "read");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xs font-mono text-neutral-500">
        Total {messages.length} messages in inbox ({messages.filter((m) => m.status === "unread").length} unread)
      </div>

      {messages.length === 0 ? (
        <div className="p-16 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-800 text-center font-mono text-xs text-neutral-500">
          No inquiries or messages in the inbox yet.
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
          <div className="divide-y divide-neutral-200/60 dark:divide-neutral-800/60 font-mono text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openMessage(msg)}
                className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer transition-colors ${
                  msg.status === "unread"
                    ? "bg-neutral-50 dark:bg-neutral-900/60 font-semibold"
                    : "hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    <span
                      className={`block size-2 rounded-full ${
                        msg.status === "unread"
                          ? "bg-amber-500 animate-pulse"
                          : msg.status === "replied"
                          ? "bg-blue-500"
                          : "bg-neutral-400"
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                      <span>{msg.name}</span>
                      <span className="font-normal text-neutral-400 text-[11px]">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                    <div className="text-neutral-700 dark:text-neutral-300 truncate max-w-md">
                      {msg.subject}
                    </div>
                    <div className="text-[11px] text-neutral-500 line-clamp-1 font-normal">
                      {msg.message}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <span className="text-[11px] text-neutral-400">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                      msg.status === "unread"
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300"
                        : msg.status === "replied"
                        ? "bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {msg.status}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg.id);
                    }}
                    className="p-1 rounded text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden my-8 font-mono text-xs">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                  Message Details
                </span>
                <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                <div>
                  <div className="text-neutral-400 text-[10px] uppercase">From</div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {selectedMessage.name}
                  </div>
                  <div className="text-neutral-500">{selectedMessage.email}</div>
                </div>

                <div>
                  <div className="text-neutral-400 text-[10px] uppercase">Date & Status</div>
                  <div className="text-neutral-800 dark:text-neutral-200 mt-0.5">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                  <div className="mt-1">
                    <span className="capitalize font-semibold text-emerald-600 dark:text-emerald-400">
                      {selectedMessage.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-neutral-400 text-[10px] uppercase mb-1.5">Message Content</div>
                <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/30 text-neutral-800 dark:text-neutral-200 whitespace-pre-line leading-relaxed font-sans text-sm">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, "unread")}
                    className={`px-3 py-1.5 rounded-md border text-[11px] ${
                      selectedMessage.status === "unread"
                        ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold"
                        : "border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    Mark as Unread
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                    className={`px-3 py-1.5 rounded-md border text-[11px] ${
                      selectedMessage.status === "replied"
                        ? "bg-blue-600 text-white font-bold"
                        : "border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    Mark as Replied
                  </button>
                </div>

                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 font-medium text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
                >
                  <Send className="size-3" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
