import { Metadata } from "next";
import { getGallery } from "@/lib/api";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | Sunset Kuakata Hotel & Resort",
  description:
    "Visual showcase of Sunset Kuakata coastal views, hotel development sites, and scenic natural landscapes.",
};

interface GalleryPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const items = await getGallery(category);

  return <GalleryClient items={items} />;
}
