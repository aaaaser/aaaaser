import {
  getProfile,
  getSiteSettings,
  getTechnologies,
  getProjects,
  getBlogPosts,
} from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { TechStackSection } from "@/components/tech-stack-section";
import { ProjectsSection } from "@/components/projects-section";
import { BlogSection } from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export const revalidate = 0; // Always serve fresh dynamic content

export default async function HomePage() {
  const [profile, settings, technologies, projects, posts] = await Promise.all([
    getProfile(),
    getSiteSettings(),
    getTechnologies(),
    getProjects({ publishedOnly: true }),
    getBlogPosts({ publishedOnly: true, limit: 3 }),
  ]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 transition-colors duration-200">
      {/* Top Fixed Navbar */}
      <Navbar siteName={settings.siteName} resumeUrl={profile.resumeUrl} />

      <main className="flex-1 w-full">
        {/* 1. Hero Section with Aceternity Ripple Effect */}
        <HeroSection
          name={profile.name}
          roleTitle={profile.roleTitle}
          shortDescription={profile.shortDescription || settings.heroDescription}
          badgeText={settings.heroBadge}
          githubUrl={profile.githubUrl}
          linkedinUrl={profile.linkedinUrl}
          instagramUrl={profile.instagramUrl}
          email={profile.email}
          availableForWork={profile.availableForWork}
        />

        {/* 2. About Section */}
        <AboutSection
          name={profile.name}
          roleTitle={profile.roleTitle}
          bio={profile.bio}
          avatarUrl={profile.avatarUrl}
          location={profile.location}
          experienceYears={profile.experienceYears}
          shortDescription={profile.shortDescription}
          email={profile.email}
          websiteUrl={profile.websiteUrl}
          resumeUrl={profile.resumeUrl}
          availableForWork={profile.availableForWork}
        />

        {/* 3. Tech Stack Section */}
        <TechStackSection technologies={technologies} />

        {/* 4. Projects Section */}
        <ProjectsSection projects={projects} />

        {/* 5. Blog / Insights Section */}
        <BlogSection posts={posts} />

        {/* 6. Contact Section */}
        <ContactSection
          email={profile.email}
          location={profile.location}
          availableForWork={profile.availableForWork}
        />
      </main>

      {/* Footer */}
      <Footer
        siteName={settings.siteName}
        footerText={settings.footerText}
        githubUrl={profile.githubUrl}
        linkedinUrl={profile.linkedinUrl}
        instagramUrl={profile.instagramUrl}
        email={profile.email}
      />
    </div>
  );
}
