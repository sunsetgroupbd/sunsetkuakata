import { Metadata } from "next";
import { getSiteSettings } from "@/lib/api";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Consultations | Sunset Kuakata Hotel & Resort",
  description:
    "Get in touch with Sunset Kuakata Hotel & Resort Limited. Visit our Dhanmondi headquarters or call +8801325074535 for verified hotel ownership consultation.",
};

interface ContactPageProps {
  searchParams: Promise<{ project?: string; package?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { project, package: packageSlug } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <ContactClient
      settings={settings}
      initialProject={project}
      initialPackage={packageSlug}
    />
  );
}
