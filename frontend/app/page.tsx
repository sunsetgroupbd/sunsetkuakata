import {
  getProjects,
  getPackages,
  getTestimonials,
  getFaqs,
} from "@/lib/api";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { VideoShowcaseSection } from "@/components/sections/VideoShowcaseSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { PartnersAndFamilySection } from "@/components/sections/PartnersAndFamilySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";

export default async function HomePage() {
  const [projects, packages, testimonials, faqs] =
    await Promise.all([
      getProjects(),
      getPackages(),
      getTestimonials(),
      getFaqs(),
    ]);

  return (
    <>
      {/* 1. Hero with cross-fade photography & user requested Bengali/English copy */}
      <HeroSection />

      {/* 2. Our Projects (01, 02, 03, 04, 05 cards) */}
      <ProjectsShowcase projects={projects} />

      {/* 3. "Our Esteemed Partners & Sunset Family" Brochure Sections A, B & C */}
      <PartnersAndFamilySection />

      {/* 4. What People Say (sliding reviews) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 5. Ownership Packages (Platinum, Gold, Silver, Bronze) */}
      <PackagesSection packages={packages} />

      {/* 6. Video Tour & Documentaries */}
      <VideoShowcaseSection />

      {/* 7. Interactive Calculator Teaser */}
      <CalculatorTeaser packages={packages} />

      {/* 7. FAQ Section */}
      <FaqSection faqs={faqs} />

      {/* 8. Direct Hotline & WhatsApp CTA */}
      <FinalCta />
    </>
  );
}
