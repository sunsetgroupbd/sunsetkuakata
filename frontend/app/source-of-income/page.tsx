import { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { Hotel, Stethoscope, Compass, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Source of Income | Sunset Group",
  description:
    "Understanding the ethical and halal revenue sources across Sunset Group's hotel hospitality, clinical healthcare, and eco-resort operations.",
};

export default function SourceOfIncomePage() {
  return (
    <div className="bg-paper min-h-screen pt-[calc(var(--header-h)+24px)] pb-24 border-b border-ink/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.18em] font-medium text-grey-700">
            Operational Revenue Model
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink">
            Source of Income & Business Operations
          </h1>
          <p className="text-base sm:text-lg text-grey-700 leading-relaxed">
            Sunset Group generates returns through legitimate, tangible operations in luxury hospitality and clinical healthcare, governed under Company Act 1994 and guided by our Shariah supervisory committee.
          </p>
        </div>

        {/* 3 Core Income Engines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Engine 1: Hospitality */}
          <Card variant="white" className="space-y-6">
            <div className="w-12 h-12 bg-sand border border-ink/10 flex items-center justify-center text-green-900">
              <Hotel className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-ink">
              Hotel & Resort Operations
            </h2>
            <p className="text-xs sm:text-sm text-grey-700 leading-relaxed">
              Revenue generated from five-star-equivalent guest accommodations, fine dining, corporate retreats, and tourism facilities at Sunset Kuakata Hotel & Resort.
            </p>
            <ul className="text-xs text-grey-700 space-y-2 border-t border-ink/10 pt-4">
              <li>• Guest room and suite bookings</li>
              <li>• Rising tourist volume in Kuakata</li>
              <li>• Dining and event hosting revenues</li>
              <li>• Defined annual accommodation days (10 to 112 days)</li>
            </ul>
          </Card>

          {/* Engine 2: Healthcare */}
          <Card variant="white" className="space-y-6">
            <div className="w-12 h-12 bg-sand border border-ink/10 flex items-center justify-center text-green-900">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-ink">
              Healthcare & Diagnostic Sales
            </h2>
            <p className="text-xs sm:text-sm text-grey-700 leading-relaxed">
              Annual profit sharing from sales and medical services conducted by Sun Care Hospital & Diagnostic Center Ltd. in Mohammadpur / Basila, Dhaka.
            </p>
            <ul className="text-xs text-grey-700 space-y-2 border-t border-ink/10 pt-4">
              <li>• Advanced diagnostic laboratory testing</li>
              <li>• Specialist doctor consultations</li>
              <li>• Pharmacy, emergency, and ambulance operations</li>
              <li>• Investor + 20 nominated people get at-cost care</li>
            </ul>
          </Card>

          {/* Engine 3: Eco Resort & Leisure */}
          <Card variant="white" className="space-y-6">
            <div className="w-12 h-12 bg-sand border border-ink/10 flex items-center justify-center text-green-900">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-ink">
              Eco Leisure & Commercial Assets
            </h2>
            <p className="text-xs sm:text-sm text-grey-700 leading-relaxed">
              Recreational, hospitality, and residential-commercial opportunities at Dhaka Fantasy Island (DFI), 20 minutes from the Parliament House.
            </p>
            <ul className="text-xs text-grey-700 space-y-2 border-t border-ink/10 pt-4">
              <li>• Family recreation and eco-lodging</li>
              <li>• Commercial leasing and retail spaces</li>
              <li>• Saf-kabala registration backing</li>
              <li>• Permanent wealth generation avenue</li>
            </ul>
          </Card>
        </div>

        {/* Official Video Presentation: Tourism Investment & Governance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-ink/10 bg-white p-6 sm:p-10 rounded-2xl shadow-xs">
          <div className="lg:col-span-7">
            <YouTubeEmbed
              videoId="6PWf8ejVec8"
              title="Tourism Investment in Sunset Hotel & Resort Kuakata"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-block text-[11px] uppercase tracking-wider font-semibold text-green-900 bg-green-900/10 px-2.5 py-1 rounded-md">
              Official Video Documentary
            </span>
            <h3 className="font-serif text-2xl text-ink font-semibold">
              Authentic Hospitality & Real Asset Returns
            </h3>
            <p className="text-xs sm:text-sm text-grey-700 leading-relaxed">
              Watch our official video documentary illustrating the tourism growth in Kuakata, statutory deed registration, and ethical profit-sharing principles governing our hotels and diagnostic centers.
            </p>
            <div className="pt-2">
              <Button href="/gallery" variant="outline" className="text-xs">
                Watch All Video Features
              </Button>
            </div>
          </div>
        </div>

        {/* Shariah Supervision Notice */}
        <div className="border border-ink/10 bg-sand p-8 sm:p-12 space-y-4">
          <div className="flex items-center gap-3 text-green-900">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="font-serif text-2xl text-ink">
              Shariah Supervisory Governance
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-grey-700 leading-relaxed max-w-3xl">
            To fulfill our commitment that hospitality operations remain an alternative source of halal income, an independent Shariah supervisory committee oversees revenue channels to ensure that all business activities remain compliant with Islamic ethical principles.
          </p>
          <div className="pt-2">
            <Button href="/contact" variant="primary">
              Consult on Business Operations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

