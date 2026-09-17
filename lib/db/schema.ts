import { pgTable, text, timestamp, boolean, integer, serial, jsonb } from "drizzle-orm/pg-core";

// Users / Admin
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default("Admin User"),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Profile & Personal Information
export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("Aaaaser"),
  roleTitle: text("role_title").notNull().default("Full-Stack Developer & Digital Creator"),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url").notNull().default("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80"),
  location: text("location").notNull().default("Jakarta, Indonesia"),
  experienceYears: text("experience_years").notNull().default("4+ Years"),
  shortDescription: text("short_description").notNull().default("Building modern, fast, and accessible digital products for startups and forward-thinking companies."),
  resumeUrl: text("resume_url").default("#"),
  email: text("email").notNull().default("hello@example.com"),
  githubUrl: text("github_url").default("https://github.com"),
  linkedinUrl: text("linkedin_url").default("https://linkedin.com"),
  instagramUrl: text("instagram_url").default("https://instagram.com"),
  websiteUrl: text("website_url").default("https://example.com"),
  availableForWork: boolean("available_for_work").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Technologies & Skills
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  iconName: text("icon_name").notNull().default("Code2"),
  category: text("category").notNull().default("Frontend"), // Frontend, Backend, Database, Tools, Other
  description: text("description").default(""),
  displayOrder: integer("display_order").notNull().default(0),
  proficiency: text("proficiency").default("Advanced"),
  featured: boolean("featured").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Projects
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull().default("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"),
  category: text("category").notNull().default("Web Application"),
  githubUrl: text("github_url").default(""),
  demoUrl: text("demo_url").default(""),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Blog Categories
export const blogCategories = pgTable("blog_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url").notNull().default("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80"),
  category: text("category").notNull().default("Engineering"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  readingTime: text("reading_time").notNull().default("5 min read"),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"), // unread, read, replied
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Site Settings
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").notNull().default("Aaaaser Portfolio"),
  heroBadge: text("hero_badge").notNull().default("Available for Freelance & Full-time"),
  heroTitle: text("hero_title").notNull().default("Building modern digital experiences & software."),
  heroSubtitle: text("hero_subtitle").notNull().default("Developer & Digital Creator"),
  heroDescription: text("hero_description").notNull().default("I specialize in crafting high-performance, accessible web applications and tools that deliver exceptional user experiences."),
  footerText: text("footer_text").notNull().default("Designed with precision. Inspired by Vercel & Linear."),
  seoTitle: text("seo_title").notNull().default("Aaaaser — Modern Full-Stack Developer Portfolio"),
  seoDescription: text("seo_description").notNull().default("Personal portfolio showcasing full-stack projects, articles on modern web engineering, tech stack, and experience."),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
