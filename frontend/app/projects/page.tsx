import { Metadata } from "next";
import { getProjects } from "@/lib/api";
import { ProjectsPageClient } from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects | Sunset Kuakata Hotel & Resort",
  description:
    "Explore Sunset Group's real asset portfolio: Sunset Kuakata Hotel & Resort, Sun Care Hospital & Diagnostic Center, Dhaka Fantasy Island (DFI), Mangrove, and Super Combo Investment.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsPageClient projects={projects} />;
}
