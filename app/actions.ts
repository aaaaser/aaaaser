"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  authenticateUser,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
} from "@/lib/auth";
import {
  updateProfile,
  updateSiteSettings,
  createProject,
  updateProject,
  deleteProject,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  createContactMessage,
  updateMessageStatus,
  deleteContactMessage,
} from "@/lib/db";

// ==========================================
// AUTH ACTIONS
// ==========================================
export async function loginAction(prevState: { error?: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/admin";

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const session = await authenticateUser(email, password);
  if (!session) {
    return { error: "Email atau password tidak valid. Coba admin@example.com / admin123456" };
  }

  const token = await createSessionToken(session);
  await setSessionCookie(token);

  redirect(redirectTo);
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}

// ==========================================
// CONTACT FORM ACTION
// ==========================================
export interface ContactFormState {
  success?: boolean;
  message?: string;
  error?: string;
}

export async function submitContactAction(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const subject = (formData.get("subject") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !subject || !message) {
    return { error: "Semua kolom formulir wajib diisi." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Format email tidak valid." };
  }

  try {
    await createContactMessage({
      name,
      email,
      subject,
      message,
    });
    revalidatePath("/admin/messages");
    return {
      success: true,
      message: "Terima kasih! Pesan Anda telah berhasil terkirim dan tersimpan di database. Kami akan segera merespons.",
    };
  } catch {
    return { error: "Gagal mengirim pesan ke server. Silakan coba lagi." };
  }
}

// ==========================================
// PROFILE MUTATIONS
// ==========================================
export async function updateProfileAdminAction(data: {
  name: string;
  roleTitle: string;
  bio: string;
  avatarUrl: string;
  location: string;
  experienceYears: string;
  shortDescription: string;
  resumeUrl?: string | null;
  email: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  websiteUrl?: string | null;
  availableForWork: boolean;
}) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await updateProfile(data);
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin");
  revalidatePath("/admin/profile");
  return { success: true };
}

// ==========================================
// SITE SETTINGS MUTATIONS
// ==========================================
export async function updateSiteSettingsAdminAction(data: {
  siteName: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
}) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await updateSiteSettings(data);
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true };
}

// ==========================================
// PROJECT MUTATIONS
// ==========================================
export async function saveProjectAdminAction(data: {
  id?: number;
  title: string;
  slug?: string;
  excerpt: string;
  description: string;
  imageUrl: string;
  category: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  technologies: string[];
  featured: boolean;
  published: boolean;
  displayOrder: number;
}) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (data.id) {
    await updateProject(data.id, { ...data, slug });
  } else {
    await createProject({ ...data, slug });
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProjectAdminAction(id: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await deleteProject(id);
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function toggleProjectPublishedAction(id: number, published: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await updateProject(id, { published });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function toggleProjectFeaturedAction(id: number, featured: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await updateProject(id, { featured });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true };
}

// ==========================================
// BLOG POST MUTATIONS
// ==========================================
export async function saveBlogPostAdminAction(data: {
  id?: number;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  readingTime?: string;
  published: boolean;
}) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (data.id) {
    await updateBlogPost(data.id, { ...data, slug });
  } else {
    await createBlogPost({ ...data, slug });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  return { success: true };
}

export async function deleteBlogPostAdminAction(id: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await deleteBlogPost(id);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}

export async function toggleBlogPostPublishedAction(id: number, published: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await updateBlogPost(id, { published });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true };
}

// ==========================================
// TECHNOLOGY MUTATIONS
// ==========================================
export async function saveTechnologyAdminAction(data: {
  id?: number;
  name: string;
  iconName: string;
  category: string;
  description?: string | null;
  displayOrder: number;
  proficiency?: string | null;
  featured: boolean;
}) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  if (data.id) {
    await updateTechnology(data.id, data);
  } else {
    await createTechnology(data);
  }

  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
  return { success: true };
}

export async function deleteTechnologyAdminAction(id: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await deleteTechnology(id);
  revalidatePath("/");
  revalidatePath("/admin/tech-stack");
  return { success: true };
}

// ==========================================
// MESSAGE MUTATIONS
// ==========================================
export async function updateMessageStatusAdminAction(id: number, status: "unread" | "read" | "replied") {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await updateMessageStatus(id, status);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessageAdminAction(id: number) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await deleteContactMessage(id);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
  return { success: true };
}
