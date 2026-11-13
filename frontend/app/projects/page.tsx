import { Metadata } from "next";
import { getProjects } from "@/lib/api";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";

export const metadata: Metadata = {
  title: "Projects | Sunset Group",
  description:
    "Explore Sunset Group's real asset portfolio: Sunset Kuakata Hotel & Resort, Sun Care Hospital & Diagnostic Center, Dhaka Fantasy Island (DFI), and Super Combo Investment.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Real Estate & Healthcare Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Our Projects
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            Tangible, lawful investments developed under Company Act 1994 governance and Shariah supervision.
          </p>
        </div>
      </div>

      <ProjectsShowcase projects={projects} />
    </div>
  );
}
