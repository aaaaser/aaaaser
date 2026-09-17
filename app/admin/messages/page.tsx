import { getContactMessages } from "@/lib/db";
import { MessagesManager } from "./messages-manager";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
          Admin &bull; Inbox
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-900 dark:text-neutral-100">
          Contact Messages
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Read, organize, respond to, and manage client and visitor inquiries.
        </p>
      </div>

      <MessagesManager initialMessages={messages} />
    </div>
  );
}
