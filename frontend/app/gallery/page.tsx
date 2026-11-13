import { Metadata } from "next";
import Image from "next/image";
import { getGallery } from "@/lib/api";

export const metadata: Metadata = {
  title: "Gallery | Sunset Group",
  description:
    "Visual showcase of Sunset Kuakata coastal views, hotel development sites, and scenic natural landscapes.",
};

interface GalleryPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const items = await getGallery(category);

  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Visual Documentation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Project & Site Gallery
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            Real photography from the Kuakata coastal region showcasing sunrise, sunset, fishing fleets, and site developments.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-ink/10 bg-sand p-3 space-y-3 group"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-ink/10 bg-paper">
                <Image
                  src={item.url}
                  alt={item.captionEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-1 space-y-1">
                <p className="font-serif text-sm text-ink">{item.captionEn}</p>
                <p className="text-xs text-grey-700 font-bn">{item.captionBn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
