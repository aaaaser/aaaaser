import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import {
  defaultProfile,
  defaultSiteSettings,
  defaultTechnologies,
  defaultProjects,
  defaultBlogPosts,
  defaultContactMessages,
  defaultPasswordHash,
} from "./seed-data";

// In-memory store for fallback/development when DATABASE_URL is not yet connected
class InMemoryStore {
  users: Array<typeof schema.users.$inferSelect> = [
    {
      id: 1,
      email: "admin@example.com",
      passwordHash: defaultPasswordHash,
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  profile: typeof schema.profiles.$inferSelect = {
    ...defaultProfile,
    resumeUrl: defaultProfile.resumeUrl ?? null,
    githubUrl: defaultProfile.githubUrl ?? null,
    linkedinUrl: defaultProfile.linkedinUrl ?? null,
    instagramUrl: defaultProfile.instagramUrl ?? null,
    websiteUrl: defaultProfile.websiteUrl ?? null,
  };

  siteSettings: typeof schema.siteSettings.$inferSelect = {
    ...defaultSiteSettings,
    heroBadge: defaultSiteSettings.heroBadge ?? null,
    footerText: defaultSiteSettings.footerText ?? null,
    seoTitle: defaultSiteSettings.seoTitle ?? null,
    seoDescription: defaultSiteSettings.seoDescription ?? null,
  };

  technologies: Array<typeof schema.technologies.$inferSelect> = defaultTechnologies.map((t) => ({
    ...t,
    description: t.description ?? null,
    proficiency: t.proficiency ?? null,
  }));

  projects: Array<typeof schema.projects.$inferSelect> = defaultProjects.map((p) => ({
    ...p,
    githubUrl: p.githubUrl ?? null,
    demoUrl: p.demoUrl ?? null,
    technologies: p.technologies,
  }));

  blogPosts: Array<typeof schema.blogPosts.$inferSelect> = defaultBlogPosts.map((b) => ({
    ...b,
    tags: b.tags,
    readingTime: b.readingTime ?? null,
  }));

  contactMessages: Array<typeof schema.contactMessages.$inferSelect> = defaultContactMessages.map((m) => ({
    ...m,
  }));
}

// Global in-memory singleton to persist mutations during dev runtime
const globalForStore = globalThis as unknown as { inMemoryStore?: InMemoryStore };
export const memoryStore = globalForStore.inMemoryStore || new InMemoryStore();
if (process.env.NODE_ENV !== "production") {
  globalForStore.inMemoryStore = memoryStore;
}

// Neon Database Connection (when DATABASE_URL is present)
export const getDb = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return null;
  }
  try {
    const sql = neon(dbUrl);
    return drizzle(sql, { schema });
  } catch (err) {
    console.warn("[Database] Failed to connect to Neon PostgreSQL, using in-memory store:", err);
    return null;
  }
};

// ==========================================
// PROFILE SERVICES
// ==========================================
export async function getProfile(): Promise<typeof schema.profiles.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.profiles).limit(1);
      if (rows.length > 0) return rows[0];
    } catch (e) {
      console.warn("[Database Error] profiles query failed:", e);
    }
  }
  return memoryStore.profile;
}

export async function updateProfile(data: Partial<typeof schema.profiles.$inferInsert>): Promise<typeof schema.profiles.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.profiles).limit(1);
      if (rows.length > 0) {
        const [updated] = await db
          .update(schema.profiles)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(schema.profiles.id, rows[0].id))
          .returning();
        return updated;
      } else {
        const [created] = await db
          .insert(schema.profiles)
          .values({ ...data, bio: data.bio || defaultProfile.bio })
          .returning();
        return created;
      }
    } catch (e) {
      console.warn("[Database Error] updateProfile failed:", e);
    }
  }
  memoryStore.profile = {
    ...memoryStore.profile,
    ...data,
    resumeUrl: data.resumeUrl !== undefined ? data.resumeUrl : memoryStore.profile.resumeUrl,
    githubUrl: data.githubUrl !== undefined ? data.githubUrl : memoryStore.profile.githubUrl,
    linkedinUrl: data.linkedinUrl !== undefined ? data.linkedinUrl : memoryStore.profile.linkedinUrl,
    instagramUrl: data.instagramUrl !== undefined ? data.instagramUrl : memoryStore.profile.instagramUrl,
    websiteUrl: data.websiteUrl !== undefined ? data.websiteUrl : memoryStore.profile.websiteUrl,
    updatedAt: new Date(),
  };
  return memoryStore.profile;
}

// ==========================================
// SITE SETTINGS SERVICES
// ==========================================
export async function getSiteSettings(): Promise<typeof schema.siteSettings.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.siteSettings).limit(1);
      if (rows.length > 0) return rows[0];
    } catch (e) {
      console.warn("[Database Error] siteSettings query failed:", e);
    }
  }
  return memoryStore.siteSettings;
}

export async function updateSiteSettings(data: Partial<typeof schema.siteSettings.$inferInsert>): Promise<typeof schema.siteSettings.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.siteSettings).limit(1);
      if (rows.length > 0) {
        const [updated] = await db
          .update(schema.siteSettings)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(schema.siteSettings.id, rows[0].id))
          .returning();
        return updated;
      } else {
        const [created] = await db.insert(schema.siteSettings).values(data).returning();
        return created;
      }
    } catch (e) {
      console.warn("[Database Error] updateSiteSettings failed:", e);
    }
  }
  memoryStore.siteSettings = {
    ...memoryStore.siteSettings,
    ...data,
    heroBadge: data.heroBadge !== undefined ? data.heroBadge : memoryStore.siteSettings.heroBadge,
    footerText: data.footerText !== undefined ? data.footerText : memoryStore.siteSettings.footerText,
    seoTitle: data.seoTitle !== undefined ? data.seoTitle : memoryStore.siteSettings.seoTitle,
    seoDescription: data.seoDescription !== undefined ? data.seoDescription : memoryStore.siteSettings.seoDescription,
    updatedAt: new Date(),
  };
  return memoryStore.siteSettings;
}

// ==========================================
// TECHNOLOGIES SERVICES
// ==========================================
export async function getTechnologies(category?: string): Promise<Array<typeof schema.technologies.$inferSelect>> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.technologies);
      const sorted = rows.sort((a, b) => a.displayOrder - b.displayOrder);
      if (category && category !== "All") {
        return sorted.filter((t) => t.category.toLowerCase() === category.toLowerCase());
      }
      return sorted;
    } catch (e) {
      console.warn("[Database Error] technologies query failed:", e);
    }
  }
  let techs = [...memoryStore.technologies].sort((a, b) => a.displayOrder - b.displayOrder);
  if (category && category !== "All") {
    techs = techs.filter((t) => t.category.toLowerCase() === category.toLowerCase());
  }
  return techs;
}

export async function createTechnology(data: typeof schema.technologies.$inferInsert): Promise<typeof schema.technologies.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const [created] = await db.insert(schema.technologies).values(data).returning();
      return created;
    } catch (e) {
      console.warn("[Database Error] createTechnology failed:", e);
    }
  }
  const newTech: typeof schema.technologies.$inferSelect = {
    id: memoryStore.technologies.length > 0 ? Math.max(...memoryStore.technologies.map((t) => t.id)) + 1 : 1,
    name: data.name,
    iconName: data.iconName || "Code2",
    category: data.category || "Frontend",
    description: data.description ?? null,
    displayOrder: data.displayOrder ?? memoryStore.technologies.length + 1,
    proficiency: data.proficiency ?? null,
    featured: data.featured ?? true,
    createdAt: new Date(),
  };
  memoryStore.technologies.push(newTech);
  return newTech;
}

export async function updateTechnology(id: number, data: Partial<typeof schema.technologies.$inferInsert>): Promise<typeof schema.technologies.$inferSelect | null> {
  const db = getDb();
  if (db) {
    try {
      const [updated] = await db
        .update(schema.technologies)
        .set(data)
        .where(eq(schema.technologies.id, id))
        .returning();
      return updated;
    } catch (e) {
      console.warn("[Database Error] updateTechnology failed:", e);
    }
  }
  const index = memoryStore.technologies.findIndex((t) => t.id === id);
  if (index !== -1) {
    memoryStore.technologies[index] = {
      ...memoryStore.technologies[index],
      ...data,
      description: data.description !== undefined ? data.description : memoryStore.technologies[index].description,
      proficiency: data.proficiency !== undefined ? data.proficiency : memoryStore.technologies[index].proficiency,
    };
    return memoryStore.technologies[index];
  }
  return null;
}

export async function deleteTechnology(id: number): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db.delete(schema.technologies).where(eq(schema.technologies.id, id));
      return true;
    } catch (e) {
      console.warn("[Database Error] deleteTechnology failed:", e);
    }
  }
  memoryStore.technologies = memoryStore.technologies.filter((t) => t.id !== id);
  return true;
}

// ==========================================
// PROJECTS SERVICES
// ==========================================
export async function getProjects(options?: { publishedOnly?: boolean; featuredOnly?: boolean; limit?: number }): Promise<Array<typeof schema.projects.$inferSelect>> {
  const db = getDb();
  if (db) {
    try {
      let rows = await db.select().from(schema.projects);
      if (options?.publishedOnly) {
        rows = rows.filter((p) => p.published);
      }
      if (options?.featuredOnly) {
        rows = rows.filter((p) => p.featured);
      }
      rows.sort((a, b) => a.displayOrder - b.displayOrder || b.createdAt.getTime() - a.createdAt.getTime());
      if (options?.limit) {
        rows = rows.slice(0, options.limit);
      }
      return rows;
    } catch (e) {
      console.warn("[Database Error] projects query failed:", e);
    }
  }
  let projects = [...memoryStore.projects];
  if (options?.publishedOnly) {
    projects = projects.filter((p) => p.published);
  }
  if (options?.featuredOnly) {
    projects = projects.filter((p) => p.featured);
  }
  projects.sort((a, b) => a.displayOrder - b.displayOrder || b.createdAt.getTime() - a.createdAt.getTime());
  if (options?.limit) {
    projects = projects.slice(0, options.limit);
  }
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<typeof schema.projects.$inferSelect | null> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.projects).where(eq(schema.projects.slug, slug));
      if (rows.length > 0) return rows[0];
    } catch (e) {
      console.warn("[Database Error] getProjectBySlug failed:", e);
    }
  }
  return memoryStore.projects.find((p) => p.slug === slug) || null;
}

export async function createProject(data: typeof schema.projects.$inferInsert): Promise<typeof schema.projects.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const [created] = await db.insert(schema.projects).values(data).returning();
      return created;
    } catch (e) {
      console.warn("[Database Error] createProject failed:", e);
    }
  }
  const newProject: typeof schema.projects.$inferSelect = {
    id: memoryStore.projects.length > 0 ? Math.max(...memoryStore.projects.map((p) => p.id)) + 1 : 1,
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    excerpt: data.excerpt,
    description: data.description,
    imageUrl: data.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    category: data.category || "Web Application",
    githubUrl: data.githubUrl ?? null,
    demoUrl: data.demoUrl ?? null,
    technologies: (data.technologies as string[]) || [],
    featured: data.featured ?? false,
    published: data.published ?? true,
    displayOrder: data.displayOrder ?? memoryStore.projects.length + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryStore.projects.push(newProject);
  return newProject;
}

export async function updateProject(id: number, data: Partial<typeof schema.projects.$inferInsert>): Promise<typeof schema.projects.$inferSelect | null> {
  const db = getDb();
  if (db) {
    try {
      const [updated] = await db
        .update(schema.projects)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.projects.id, id))
        .returning();
      return updated;
    } catch (e) {
      console.warn("[Database Error] updateProject failed:", e);
    }
  }
  const index = memoryStore.projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    memoryStore.projects[index] = {
      ...memoryStore.projects[index],
      ...data,
      githubUrl: data.githubUrl !== undefined ? data.githubUrl : memoryStore.projects[index].githubUrl,
      demoUrl: data.demoUrl !== undefined ? data.demoUrl : memoryStore.projects[index].demoUrl,
      technologies: (data.technologies as string[]) || memoryStore.projects[index].technologies,
      updatedAt: new Date(),
    };
    return memoryStore.projects[index];
  }
  return null;
}

export async function deleteProject(id: number): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db.delete(schema.projects).where(eq(schema.projects.id, id));
      return true;
    } catch (e) {
      console.warn("[Database Error] deleteProject failed:", e);
    }
  }
  memoryStore.projects = memoryStore.projects.filter((p) => p.id !== id);
  return true;
}

// ==========================================
// BLOG SERVICES
// ==========================================
export async function getBlogPosts(options?: { publishedOnly?: boolean; limit?: number; category?: string }): Promise<Array<typeof schema.blogPosts.$inferSelect>> {
  const db = getDb();
  if (db) {
    try {
      let rows = await db.select().from(schema.blogPosts);
      if (options?.publishedOnly) {
        rows = rows.filter((b) => b.published);
      }
      if (options?.category && options.category !== "All") {
        rows = rows.filter((b) => b.category.toLowerCase() === options.category?.toLowerCase());
      }
      rows.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      if (options?.limit) {
        rows = rows.slice(0, options.limit);
      }
      return rows;
    } catch (e) {
      console.warn("[Database Error] blogPosts query failed:", e);
    }
  }
  let posts = [...memoryStore.blogPosts];
  if (options?.publishedOnly) {
    posts = posts.filter((b) => b.published);
  }
  if (options?.category && options.category !== "All") {
    posts = posts.filter((b) => b.category.toLowerCase() === options.category?.toLowerCase());
  }
  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }
  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<typeof schema.blogPosts.$inferSelect | null> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.slug, slug));
      if (rows.length > 0) return rows[0];
    } catch (e) {
      console.warn("[Database Error] getBlogPostBySlug failed:", e);
    }
  }
  return memoryStore.blogPosts.find((p) => p.slug === slug) || null;
}

export async function createBlogPost(data: typeof schema.blogPosts.$inferInsert): Promise<typeof schema.blogPosts.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const [created] = await db.insert(schema.blogPosts).values(data).returning();
      return created;
    } catch (e) {
      console.warn("[Database Error] createBlogPost failed:", e);
    }
  }
  const words = (data.content || "").split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
  const newPost: typeof schema.blogPosts.$inferSelect = {
    id: memoryStore.blogPosts.length > 0 ? Math.max(...memoryStore.blogPosts.map((b) => b.id)) + 1 : 1,
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    excerpt: data.excerpt,
    content: data.content,
    coverImageUrl: data.coverImageUrl || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    category: data.category || "Engineering",
    tags: (data.tags as string[]) || [],
    readingTime: data.readingTime ?? readingTime,
    published: data.published ?? true,
    publishedAt: data.publishedAt || new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryStore.blogPosts.push(newPost);
  return newPost;
}

export async function updateBlogPost(id: number, data: Partial<typeof schema.blogPosts.$inferInsert>): Promise<typeof schema.blogPosts.$inferSelect | null> {
  const db = getDb();
  if (db) {
    try {
      const [updated] = await db
        .update(schema.blogPosts)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.blogPosts.id, id))
        .returning();
      return updated;
    } catch (e) {
      console.warn("[Database Error] updateBlogPost failed:", e);
    }
  }
  const index = memoryStore.blogPosts.findIndex((b) => b.id === id);
  if (index !== -1) {
    memoryStore.blogPosts[index] = {
      ...memoryStore.blogPosts[index],
      ...data,
      readingTime: data.readingTime !== undefined ? data.readingTime : memoryStore.blogPosts[index].readingTime,
      tags: (data.tags as string[]) || memoryStore.blogPosts[index].tags,
      updatedAt: new Date(),
    };
    return memoryStore.blogPosts[index];
  }
  return null;
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
      return true;
    } catch (e) {
      console.warn("[Database Error] deleteBlogPost failed:", e);
    }
  }
  memoryStore.blogPosts = memoryStore.blogPosts.filter((b) => b.id !== id);
  return true;
}

// ==========================================
// CONTACT MESSAGES SERVICES
// ==========================================
export async function getContactMessages(): Promise<Array<typeof schema.contactMessages.$inferSelect>> {
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.contactMessages);
      return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (e) {
      console.warn("[Database Error] contactMessages query failed:", e);
    }
  }
  return [...memoryStore.contactMessages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function createContactMessage(data: { name: string; email: string; subject: string; message: string }): Promise<typeof schema.contactMessages.$inferSelect> {
  const db = getDb();
  if (db) {
    try {
      const [created] = await db.insert(schema.contactMessages).values(data).returning();
      return created;
    } catch (e) {
      console.warn("[Database Error] createContactMessage failed:", e);
    }
  }
  const newMessage: typeof schema.contactMessages.$inferSelect = {
    id: memoryStore.contactMessages.length > 0 ? Math.max(...memoryStore.contactMessages.map((m) => m.id)) + 1 : 1,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: "unread",
    createdAt: new Date(),
  };
  memoryStore.contactMessages.unshift(newMessage);
  return newMessage;
}

export async function updateMessageStatus(id: number, status: "unread" | "read" | "replied"): Promise<typeof schema.contactMessages.$inferSelect | null> {
  const db = getDb();
  if (db) {
    try {
      const [updated] = await db
        .update(schema.contactMessages)
        .set({ status })
        .where(eq(schema.contactMessages.id, id))
        .returning();
      return updated;
    } catch (e) {
      console.warn("[Database Error] updateMessageStatus failed:", e);
    }
  }
  const index = memoryStore.contactMessages.findIndex((m) => m.id === id);
  if (index !== -1) {
    memoryStore.contactMessages[index].status = status;
    return memoryStore.contactMessages[index];
  }
  return null;
}

export async function deleteContactMessage(id: number): Promise<boolean> {
  const db = getDb();
  if (db) {
    try {
      await db.delete(schema.contactMessages).where(eq(schema.contactMessages.id, id));
      return true;
    } catch (e) {
      console.warn("[Database Error] deleteContactMessage failed:", e);
    }
  }
  memoryStore.contactMessages = memoryStore.contactMessages.filter((m) => m.id !== id);
  return true;
}

// ==========================================
// DASHBOARD STATS
// ==========================================
export async function getDashboardStats() {
  const [allProjects, allPosts, allMessages] = await Promise.all([
    getProjects(),
    getBlogPosts(),
    getContactMessages(),
  ]);

  return {
    totalProjects: allProjects.length,
    publishedProjects: allProjects.filter((p) => p.published).length,
    totalBlogPosts: allPosts.length,
    publishedPosts: allPosts.filter((p) => p.published).length,
    totalMessages: allMessages.length,
    unreadMessages: allMessages.filter((m) => m.status === "unread").length,
  };
}

// ==========================================
// USER / AUTH SERVICES
// ==========================================
export async function getUserByEmail(email: string): Promise<typeof schema.users.$inferSelect | null> {
  const normalizedEmail = (email || "").trim().toLowerCase();
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(schema.users).where(eq(schema.users.email, normalizedEmail));
      if (rows.length > 0) return rows[0];

      // If database is connected but no user exists and it's admin@example.com, auto-create default admin
      if (normalizedEmail === "admin@example.com") {
        try {
          const [seededAdmin] = await db
            .insert(schema.users)
            .values({
              email: "admin@example.com",
              passwordHash: defaultPasswordHash,
              name: "Admin User",
              role: "admin",
            })
            .returning();
          return seededAdmin;
        } catch {
          // In case of conflict or insert error, return memoryStore fallback
        }
      }
    } catch (e) {
      console.warn("[Database Error] getUserByEmail failed:", e);
    }
  }
  return memoryStore.users.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
}

