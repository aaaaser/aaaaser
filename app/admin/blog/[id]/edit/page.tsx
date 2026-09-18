import React from "react";
import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog/blog-form";

export const metadata = {
  title: "Edit Artikel - Admin Blog",
  description: "Ubah dan optimalkan konten artikel blog",
};

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getBlogPostById(postId);

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} mode="edit" />;
}
