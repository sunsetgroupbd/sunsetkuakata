import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getBlogs } from "@/lib/api";
import { ArrowLeft, Calendar } from "lucide-react";

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
    title: `${blog.titleEn} | Sunset Group`,
    description: blog.excerptEn,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-grey-700 hover:text-green-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-green-900 font-medium">
            <Calendar className="w-4 h-4" />
            <span>Published {blog.publishedAt}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
            {blog.titleEn}
          </h1>
          <p className="font-serif text-xl text-grey-700 italic font-bn">
            {blog.titleBn}
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full border border-ink/10 bg-sand overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.titleEn}
            fill
            priority
            sizes="(max-width: 840px) 100vw, 840px"
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none space-y-6 pt-6 border-t border-ink/10 text-grey-700 leading-relaxed text-base sm:text-lg">
          <p className="font-medium text-ink">{blog.excerptEn}</p>
          <p>{blog.bodyEn}</p>
          <hr className="border-ink/10 my-8" />
          <div className="font-bn space-y-4">
            <p className="font-medium text-ink">{blog.excerptBn}</p>
            <p>{blog.bodyBn}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

