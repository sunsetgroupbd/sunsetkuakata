import { Metadata } from "next";
import { getSiteSettings } from "@/lib/api";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Card } from "@/components/ui/Card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/svg/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Contact & Consultations | Sunset Group",
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
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Direct Communications & Headquarters
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Contact Sunset Group
          </h1>
          <p className="text-base text-grey-700 leading-relaxed">
            Reach our investment advisory desk, visit our Dhanmondi office, or submit an official inquiry for project documents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <InquiryForm
              initialProject={project || "kuakata-hotel"}
              initialPackage={packageSlug || ""}
            />
          </div>

          {/* Contact Details & Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="sand" className="space-y-6">
              <h3 className="font-serif text-2xl text-ink">Head Office</h3>

              <div className="space-y-4 text-xs sm:text-sm text-grey-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-green-900 flex-shrink-0" />
                  <a href={`tel:${settings.phone}`} className="hover:text-ink font-semibold">
                    {settings.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <WhatsAppIcon size={16} className="w-4 h-4 text-green-900 flex-shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink font-semibold underline"
                  >
                    Chat on WhatsApp ({settings.whatsapp})
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-green-900 flex-shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-ink underline">
                    {settings.email}
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-ink/10">
                  <Clock className="w-4 h-4 text-green-900 flex-shrink-0 mt-0.5" />
                  <span>{settings.officeHours}</span>
                </div>
              </div>
            </Card>

            <Card variant="white" className="space-y-4">
              <h4 className="font-serif text-lg text-ink">Legal Identity</h4>
              <p className="text-xs text-grey-700 leading-relaxed">
                Sunset Kuakata Hotel & Resort Limited is registered under Company Act 1994. Inquiries received through this portal are treated under strict confidentiality in compliance with our corporate policies.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
