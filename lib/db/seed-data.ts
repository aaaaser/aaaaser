import bcrypt from "bcryptjs";

export const initialAdminPassword = "admin123456";
export const defaultPasswordHash = bcrypt.hashSync(initialAdminPassword, 10);

export const defaultProfile = {
  id: 1,
  name: "Aaaaser",
  roleTitle: "Full-Stack Engineer & Digital Creator",
  bio: "Hello! I am a full-stack engineer passionate about crafting resilient, high-speed digital experiences. With a strong background in Next.js, TypeScript, React, and cloud architectures, I transform ideas into production-ready software that scales gracefully.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
  location: "Jakarta, Indonesia & Remote",
  experienceYears: "5+ Years",
  shortDescription: "I build modern digital experiences, scalable web applications, and developer-first products with clean minimalist craftsmanship.",
  resumeUrl: "/resume.pdf",
  email: "hello@aaaaser.dev",
  githubUrl: "https://github.com/aaaaser",
  linkedinUrl: "https://linkedin.com/in/aaaaser",
  instagramUrl: "https://instagram.com/aaaaser.dev",
  websiteUrl: "https://aaaaser.dev",
  availableForWork: true,
  updatedAt: new Date(),
};

export const defaultSiteSettings = {
  id: 1,
  siteName: "Aaaaser Portfolio",
  heroBadge: "Available for Freelance & Full-time",
  heroTitle: "Building modern digital experiences & software.",
  heroSubtitle: "Developer & Digital Creator",
  heroDescription: "I build modern digital experiences, web applications, and useful products with a focus on speed, typography, and clean architectures.",
  footerText: "Crafted with Next.js, React, Tailwind CSS, and Neon PostgreSQL.",
  seoTitle: "Aaaaser — Modern Full-Stack Developer & Creator",
  seoDescription: "Explore projects, technical blog articles, tech stack expertise, and background of Aaaaser, a full-stack developer.",
  updatedAt: new Date(),
};

export const defaultTechnologies = [
  {
    id: 1,
    name: "Next.js",
    iconName: "Flame",
    category: "Frontend",
    description: "App Router, Server Components, SSR, and Turbopack for production web applications.",
    displayOrder: 1,
    proficiency: "Expert",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "React 19",
    iconName: "Atom",
    category: "Frontend",
    description: "Concurrent features, custom hooks, Suspense, and fluid component architectures.",
    displayOrder: 2,
    proficiency: "Expert",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "TypeScript",
    iconName: "FileCode2",
    category: "Frontend",
    description: "Strict static typing, generative schemas, and type-safe full-stack workflows.",
    displayOrder: 3,
    proficiency: "Expert",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: "Tailwind CSS",
    iconName: "Palette",
    category: "Frontend",
    description: "Utility-first CSS, modern tokens, responsive grids, and design systems.",
    displayOrder: 4,
    proficiency: "Expert",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    name: "Node.js",
    iconName: "Server",
    category: "Backend",
    description: "High-throughput asynchronous runtimes, RESTful APIs, and microservices.",
    displayOrder: 5,
    proficiency: "Advanced",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "PostgreSQL & Neon",
    iconName: "Database",
    category: "Database",
    description: "Serverless relational queries, Drizzle ORM schemas, indexing, and connection pooling.",
    displayOrder: 6,
    proficiency: "Advanced",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 7,
    name: "Drizzle ORM",
    iconName: "Layers",
    category: "Database",
    description: "Zero-overhead, TypeScript-first SQL query builder and schema migration tool.",
    displayOrder: 7,
    proficiency: "Advanced",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 8,
    name: "Python",
    iconName: "Terminal",
    category: "Backend",
    description: "Data pipelines, automated scripts, backend services with FastAPI and AI tools.",
    displayOrder: 8,
    proficiency: "Advanced",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 9,
    name: "Docker",
    iconName: "Box",
    category: "Tools",
    description: "Containerized deployments, reproducible development environments, and CI/CD.",
    displayOrder: 9,
    proficiency: "Intermediate",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 10,
    name: "Git & GitHub",
    iconName: "GitBranch",
    category: "Tools",
    description: "Version control, automated GitHub Actions, code reviews, and release tags.",
    displayOrder: 10,
    proficiency: "Expert",
    featured: true,
    createdAt: new Date(),
  },
  {
    id: 11,
    name: "PHP",
    iconName: "Cpu",
    category: "Backend",
    description: "Modern backend architectures, MVC frameworks, and legacy migration services.",
    displayOrder: 11,
    proficiency: "Intermediate",
    featured: false,
    createdAt: new Date(),
  },
  {
    id: 12,
    name: "Vercel & Cloud",
    iconName: "Cloud",
    category: "Tools",
    description: "Edge network delivery, serverless compute, automated staging, and observability.",
    displayOrder: 12,
    proficiency: "Expert",
    featured: true,
    createdAt: new Date(),
  },
];

export const defaultProjects = [
  {
    id: 1,
    title: "Vortex Cloud Analytics",
    slug: "vortex-cloud-analytics",
    excerpt: "Real-time edge telemetry and analytics dashboard with sub-millisecond query aggregation and custom query builder.",
    description: `## Overview
Vortex is an enterprise-grade observability and telemetry platform designed for serverless architectures. It aggregates logs, metrics, and distributed traces from distributed edge nodes and visualizes them through interactive latency heatmaps and percentile distributions.

## Key Features
- **Real-Time Edge Streaming**: Ingests up to 50,000 events/sec via WebSocket stream adapters.
- **Dynamic Query Builder**: Allows multi-dimensional filtering with SQL-like syntax in browser memory.
- **Customizable Dashboard Widgets**: Interactive charts with Recharts and Canvas rendering for high frame rates.
- **Dark & Light Monochrome Mode**: Precision UI inspired by developer tools like Linear and Vercel.

## Architecture & Tech Stack
Built on Next.js App Router, TypeScript, Neon PostgreSQL, Drizzle ORM, and Tailwind CSS. State management is orchestrated through React 19 concurrent features and optimistic updates.`,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    category: "Web Application",
    githubUrl: "https://github.com/aaaaser/vortex-analytics",
    demoUrl: "https://vortex-demo.example.com",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Drizzle ORM"],
    featured: true,
    published: true,
    displayOrder: 1,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-02-10"),
  },
  {
    id: 2,
    title: "Synthetix Design Studio",
    slug: "synthetix-design-studio",
    excerpt: "Collaborative generative canvas and design token workflow system for distributed product engineering teams.",
    description: `## Overview
Synthetix Studio bridges the divide between product designers and frontend engineers by compiling multi-brand tokens directly into type-safe CSS and Tailwind classes in real time.

## Key Features
- **Multi-Brand Token Engine**: Synchronizes color palettes, typography scales, and spacing matrices.
- **Real-Time Canvas Collaboration**: Multi-cursor previews with zero-latency state replication.
- **Code Export**: 1-click export to Tailwind v4 theme configurations, CSS custom properties, and shadcn components.
- **Frictionless Onboarding**: Zero setup requirement with browser-native WASM compilation.

## Tech Stack
Next.js, TypeScript, React 19, Tailwind CSS, WebSockets, and Neon Database.`,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    category: "Productivity / SaaS",
    githubUrl: "https://github.com/aaaaser/synthetix-studio",
    demoUrl: "https://synthetix.example.com",
    technologies: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
    featured: true,
    published: true,
    displayOrder: 2,
    createdAt: new Date("2025-11-20"),
    updatedAt: new Date("2026-01-05"),
  },
  {
    id: 3,
    title: "Kura E-Commerce Platform",
    slug: "kura-ecommerce-platform",
    excerpt: "Headless minimalist commerce engine with instant checkout, serverless inventory sync, and multi-currency pricing.",
    description: `## Overview
Kura is a headless e-commerce storefront crafted for artisanal lifestyle goods. Engineered for maximum conversion and speed, it achieves a 100 Lighthouse performance score across all pages.

## Key Highlights
- **Sub-100ms Page Transitions**: Server-side pre-rendered catalogs with dynamic cart state.
- **Stripe & Local Payment Gateways**: Multi-tier checkout flows with localized currency conversion.
- **Automated Inventory Webhooks**: Real-time stock reservation with optimistic locks.
- **Minimalist Vercel Aesthetic**: Elegant typography, high-contrast imagery, and smooth micro-interactions.

## Tech Stack
Next.js 16, TypeScript, Neon PostgreSQL, Drizzle ORM, Tailwind CSS, Stripe API.`,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    category: "E-Commerce",
    githubUrl: "https://github.com/aaaaser/kura-commerce",
    demoUrl: "https://kura.example.com",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Stripe"],
    featured: true,
    published: true,
    displayOrder: 3,
    createdAt: new Date("2025-08-10"),
    updatedAt: new Date("2025-12-01"),
  },
  {
    id: 4,
    title: "Nexus Developer Portal",
    slug: "nexus-developer-portal",
    excerpt: "Interactive API documentation hub with live sandbox execution, OpenAPI 3.1 specification parser, and SDK code generation.",
    description: `## Overview
Nexus provides developer teams with an intuitive platform to document, test, and distribute API specifications effortlessly.

## Capabilities
- Automated OpenAPI schema parsing and interactive request playground.
- Instant SDK snippet generator in TypeScript, Python, Go, and cURL.
- Full text search with instant keyboard navigation.`,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    category: "Developer Tools",
    githubUrl: "https://github.com/aaaaser/nexus-docs",
    demoUrl: "https://nexus-docs.example.com",
    technologies: ["Next.js", "TypeScript", "OpenAPI", "Tailwind CSS"],
    featured: false,
    published: true,
    displayOrder: 4,
    createdAt: new Date("2025-06-18"),
    updatedAt: new Date("2025-09-12"),
  },
];

export const defaultBlogPosts = [
  {
    id: 1,
    title: "Architecting Modern Full-Stack Next.js Apps with Neon & Drizzle ORM",
    slug: "architecting-modern-fullstack-nextjs-neon-drizzle",
    excerpt: "A deep dive into building production-grade serverless web apps using Next.js App Router, Neon PostgreSQL over WebSockets, and zero-cost type safety with Drizzle ORM.",
    content: `<h2>The Modern Serverless Data Paradigm</h2>
<p>When building modern web applications on platforms like Vercel, traditional database connection pooling often introduces latency spikes and cold-start hurdles. Serverless PostgreSQL engines like <strong>Neon</strong> completely transform this dynamic by decoupling compute from storage.</p>

<h2>Why Drizzle ORM?</h2>
<p>Unlike heavy ORMs that abstract SQL away behind complex runtime layers, Drizzle acts as a transparent, type-safe query builder that compiles directly to raw SQL with <strong>zero overhead</strong>.</p>

<pre><code>import { drizzle } from "drizzle-orm/neon-serverless";
import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});</code></pre>

<h3>Server Actions vs. Route Handlers</h3>
<p>In Next.js App Router, combining Server Actions with Drizzle guarantees:</p>
<ul>
  <li><strong>End-to-End Type Safety</strong>: Server-returned types flow directly to client components without intermediate JSON serialization schemas.</li>
  <li><strong>Atomic Invalidation</strong>: <code>revalidatePath</code> updates the user interface instantly without full-page reloads.</li>
  <li><strong>Robust Security</strong>: Credentials never leak to browser bundles.</li>
</ul>

<h2>Summary</h2>
<p>By pairing Next.js with Neon and Drizzle ORM, developers achieve blazing fast deployments, seamless database branching, and sub-10ms query execution across global edge regions.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    thumbnailAlt: "Next.js architecture with Neon PostgreSQL and Drizzle ORM",
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    category: "Architecture",
    tags: ["Next.js", "PostgreSQL", "Drizzle ORM", "TypeScript"],
    author: "Alex Rivera",
    status: "published" as const,
    readingTime: "6 min read",
    published: true,
    publishedAt: new Date("2026-02-18"),
    seoTitle: "Architecting Modern Full-Stack Next.js Apps with Neon & Drizzle",
    seoDescription: "Learn how to build production-grade serverless web apps using Next.js App Router, Neon PostgreSQL over WebSockets, and type safety with Drizzle ORM.",
    seoKeywords: "Next.js, Neon PostgreSQL, Drizzle ORM, Serverless, TypeScript",
    focusKeyword: "Next.js",
    seoScore: 92,
    createdAt: new Date("2026-02-18"),
    updatedAt: new Date("2026-02-18"),
  },
  {
    id: 2,
    title: "Minimalist UI Craftsmanship: Principles Inspired by Vercel & Linear",
    slug: "minimalist-ui-craftsmanship-vercel-linear",
    excerpt: "Exploring the nuances of modern monochrome software design: mathematical typography scales, subtle borders, high negative space, and deliberate micro-interactions.",
    content: `<h2>The Essence of High-Craft Software Design</h2>
<p>Great developer tools don't rely on flashy gradient text or bloated decorative illustrations. Instead, applications like Vercel, Linear, and Supabase captivate users through <strong>precision, restraint, and optical clarity</strong>.</p>

<h2>1. The Power of Monochrome & Contrast</h2>
<p>Using a tightly controlled monochromatic palette allows content to take center stage. Grays should not be random hex codes; they should follow balanced contrast ratios:</p>
<ul>
  <li>Border lines at <code>border-neutral-200</code> and <code>dark:border-neutral-800</code>.</li>
  <li>Subtle background elevations with <code>bg-neutral-50</code> and <code>dark:bg-neutral-900</code>.</li>
  <li>Clear, uncompromised typography hierarchy.</li>
</ul>

<h2>2. Optical Whitespace & Rhythmic Spacing</h2>
<p>Whitespace is not empty space—it is the structure that gives typography breath. By maintaining strict padding multiples (<code>p-4</code>, <code>p-6</code>, <code>p-8</code>), layouts feel cohesive and calm.</p>

<h3>3. Deliberate Micro-Interactions</h3>
<p>Every interactive element should respond with tactile immediacy:</p>
<ul>
  <li>Subtle scale transitions on hover (<code>scale-[1.01]</code>).</li>
  <li>Smooth border-color shifts when active.</li>
  <li>Light, physics-based entry animations.</li>
</ul>

<h2>Conclusion</h2>
<p>Craftsmanship is not about how much you can add—it is about how much you can remove while elevating clarity and utility.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    thumbnailAlt: "Minimalist UI Craftsmanship design principles",
    coverImageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    category: "Design & UX",
    tags: ["UI/UX", "Design Systems", "Tailwind CSS", "Vercel"],
    author: "Alex Rivera",
    status: "published" as const,
    readingTime: "5 min read",
    published: true,
    publishedAt: new Date("2026-01-28"),
    seoTitle: "Minimalist UI Craftsmanship: Principles Inspired by Vercel & Linear",
    seoDescription: "Exploring the nuances of modern monochrome software design: typography scales, subtle borders, high negative space, and deliberate micro-interactions.",
    seoKeywords: "UI/UX, Minimalist Design, Vercel, Linear, Design Systems",
    focusKeyword: "Minimalist UI",
    seoScore: 88,
    createdAt: new Date("2026-01-28"),
    updatedAt: new Date("2026-01-28"),
  },
  {
    id: 3,
    title: "Mastering React 19: Server Actions, Optimistic State, and Suspense",
    slug: "mastering-react-19-server-actions-optimistic-state",
    excerpt: "How React 19's useActionState, useOptimistic, and Server Functions streamline data mutations and eliminate boilerplate code.",
    content: `<h2>The Next Evolution of React Data Mutability</h2>
<p>React 19 brings unified primitives that simplify full-stack state management. Gone are the days of manual <code>isLoading</code>, <code>error</code>, and <code>success</code> booleans sprinkled across every form component.</p>

<h2><code>useActionState</code> in Action</h2>
<p>With <code>useActionState</code>, form submissions naturally encapsulate validation errors and pending states without third-party form wrappers:</p>

<pre><code>"use client";
import { useActionState } from "react";
import { submitContactForm } from "@/app/actions";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    &lt;form action={formAction}&gt;
      &lt;input name="email" required /&gt;
      &lt;button disabled={isPending}&gt;
        {isPending ? "Submitting..." : "Send Message"}
      &lt;/button&gt;
    &lt;/form&gt;
  );
}</code></pre>

<h2>Zero-Flicker Optimistic Updates</h2>
<p>Pairing <code>useOptimistic</code> with Server Actions creates instantaneous user feedback while background verification runs securely on the server.</p>

<h2>Key Takeaways</h2>
<p>Embracing modern React primitives leads to cleaner codebases, fewer dependencies, and better web performance.</p>`,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
    thumbnailAlt: "Mastering React 19 Server Actions and Optimistic State",
    coverImageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
    category: "Engineering",
    tags: ["React 19", "JavaScript", "Frontend", "Performance"],
    author: "Alex Rivera",
    status: "published" as const,
    readingTime: "4 min read",
    published: true,
    publishedAt: new Date("2025-12-14"),
    seoTitle: "Mastering React 19: Server Actions, Optimistic State & Suspense",
    seoDescription: "Discover how React 19's useActionState, useOptimistic, and Server Functions streamline data mutations and eliminate boilerplate frontend code.",
    seoKeywords: "React 19, Server Actions, useOptimistic, useActionState",
    focusKeyword: "React 19",
    seoScore: 85,
    createdAt: new Date("2025-12-14"),
    updatedAt: new Date("2025-12-14"),
  },
];

export const defaultContactMessages = [
  {
    id: 1,
    name: "Alex Rivera",
    email: "alex@techventure.io",
    subject: "Full-Stack Project Collaboration",
    message: "Hi Aaaaser, we loved your work on the Vortex Cloud Analytics platform. We're looking for a lead full-stack developer to help build our next-generation developer tooling app. Would you be available for a quick introductory call this week?",
    status: "unread",
    createdAt: new Date("2026-03-01T10:15:00Z"),
  },
  {
    id: 2,
    name: "Elena Rostova",
    email: "elena@designcraft.co",
    subject: "Speaking invitation for DevCraft Summit",
    message: "Hello! We would be thrilled to invite you as a speaker to discuss Minimalist UI and Serverless Architectures at the upcoming DevCraft Summit. Let us know if you're interested!",
    status: "read",
    createdAt: new Date("2026-02-24T14:30:00Z"),
  },
];
