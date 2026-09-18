import React from "react";
import { BlogForm } from "@/components/admin/blog/blog-form";

export const metadata = {
  title: "Tulis Artikel Baru - Admin Blog",
  description: "Buat dan optimalkan artikel blog baru dengan TinyMCE dan SEO Analyzer",
};

export default function NewBlogPostPage() {
  return <BlogForm mode="create" />;
}
