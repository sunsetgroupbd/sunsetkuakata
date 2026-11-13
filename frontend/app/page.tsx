import {
  getProjects,
  getPackages,
  getTestimonials,
  getFaqs,
} from "@/lib/api";

import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
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

      {/* 2. Our Projects (01, 02, 03, 04 cards matching Image 1) */}
      <ProjectsShowcase projects={projects} />

      {/* 3. Hotel Ownership Packages (Platinum, Gold, Silver, Bronze matching Image 1) */}
      <PackagesSection packages={packages} />

      {/* 4. "Our Esteemed Partners & Sunset Family" Brochure Sections A, B & C */}
      <PartnersAndFamilySection />

      {/* 5. What People Say (3 cards matching Image 1) */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. Interactive Calculator Teaser */}
      <CalculatorTeaser packages={packages} />

      {/* 8. FAQ Section */}
      <FaqSection faqs={faqs} />

      {/* 9. Direct Hotline & WhatsApp CTA */}
      <FinalCta />
    </>
  );
}
