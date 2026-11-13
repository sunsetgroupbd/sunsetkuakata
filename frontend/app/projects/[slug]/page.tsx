import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MapPin, Check, ArrowLeft, Shield } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.nameEn} | Sunset Group`,
    description: project.summaryEn,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-grey-700 hover:text-green-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Projects</span>
        </Link>

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-green-900 font-medium">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              {project.nameEn}
            </h1>
            <p className="font-serif text-lg text-grey-700 italic">
              {project.nameBn}
            </p>

            <p className="text-base sm:text-lg text-grey-700 leading-relaxed">
              {project.summaryEn}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={`/contact?project=${project.slug}`} variant="primary">
                Inquire About Ownership
              </Button>
              <Button href="/packages" variant="outline">
                View Packages
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] bg-sand border border-ink/10 overflow-hidden">
            <Image
              src={project.heroImage}
              alt={project.nameEn}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Detailed Body & Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-ink/10">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl text-ink">Project Overview</h2>
              <p className="text-sm sm:text-base text-grey-700 leading-relaxed whitespace-pre-line">
                {project.bodyEn}
              </p>
              <p className="text-sm sm:text-base text-grey-700 leading-relaxed whitespace-pre-line pt-2 font-bn">
                {project.bodyBn}
              </p>
            </div>

            {/* Highlights from Source Content */}
            <div className="space-y-4 pt-6 border-t border-ink/10">
              <h3 className="font-serif text-xl text-ink">Key Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlightsEn.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-grey-700">
                    <Check className="w-4 h-4 text-green-900 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services (if available, e.g. Sun Care Hospital) */}
            {project.servicesEn && project.servicesEn.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-ink/10">
                <h3 className="font-serif text-xl text-ink">Clinical & Diagnostic Services</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.servicesEn.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-grey-700">
                      <Shield className="w-4 h-4 text-green-900 mt-0.5 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4">
            <Card variant="sand" className="space-y-6 sticky top-28">
              <h3 className="font-serif text-xl text-ink">Ownership Consultation</h3>
              <p className="text-xs text-grey-700 leading-relaxed">
                Receive certified documentation, legal deed details, and partnership schedules for {project.nameEn}.
              </p>
              <div className="space-y-3 pt-2">
                <Button href={`/contact?project=${project.slug}`} variant="primary" className="w-full text-xs">
                  Request Information
                </Button>
                <Button href="tel:+8801325074535" variant="outline" className="w-full text-xs">
                  Call: +8801325074535
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

