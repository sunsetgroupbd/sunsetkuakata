import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { BlogDetailClient } from "./BlogDetailClient";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.titleEn} | Sunset Kuakata Hotel & Resort`,
    description: blog.excerptEn,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
