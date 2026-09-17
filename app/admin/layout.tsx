import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminNav } from "./admin-nav";

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login?redirectTo=/admin");
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col lg:flex-row">
      <AdminNav userEmail={session.email} />
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
