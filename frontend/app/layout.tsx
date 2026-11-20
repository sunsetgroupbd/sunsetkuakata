import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Poppins, Noto_Serif_Bengali, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { InvestmentLeadPopup } from "@/components/ui/InvestmentLeadPopup";
import { getSiteSettings } from "@/lib/api";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sunsetkuakatahotel.com"),
  title: {
    default: "Sunset Kuakata Hotel & Resort | Luxury & Recreation with Ethical Hospitality",
    template: "%s | Sunset Kuakata",
  },
  description:
    "Sunset Kuakata Hotel & Resort Limited, governed by Company Act 1994. Developing luxury hotels, resorts, and healthcare infrastructure with ethical hospitality and Shariah supervision.",
  keywords: [
    "Sunset Kuakata",
    "Sunset Kuakata Hotel & Resort",
    "Sunset Kuakata Hotel and Resort Ltd",
    "Sunset Group",
    "Kuakata Hotel & Resort",
    "Halal Investment Bangladesh",
    "Ethical Hospitality Kuakata",
    "Saf Kabala Registration",
    "Sun Care Hospital",
    "Dhaka Fantasy Island",
  ],
  authors: [{ name: "Sunset Kuakata Hotel & Resort" }],
  creator: "Sunset Kuakata Hotel & Resort Limited",
  alternates: {
    canonical: "https://sunsetkuakatahotel.com",
    languages: {
      "en-US": "https://sunsetkuakatahotel.com",
      "bn-BD": "https://sunsetkuakatahotel.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: "en_US",
    url: "https://sunsetkuakatahotel.com",
    siteName: "Sunset Kuakata Hotel & Resort",
    title: "Sunset Kuakata Hotel & Resort | Luxury & Recreation with Ethical Hospitality",
    description:
      "Sunset Kuakata Hotel & Resort Limited, Company Act 1994. Discover prime hospitality and healthcare developments in Kuakata and Dhaka.",
    images: [
      {
        url: "/images/hero1.webp",
        width: 1200,
        height: 630,
        alt: "Sunset Kuakata Coastal Landscape",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sunset Group",
    legalName: "Sunset Kuakata Hotel & Resort Limited",
    url: "https://sunsetgroupbd.com",
    logo: "https://sunsetgroupbd.com/logo.png",
    description: settings.tagline,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Dhaka",
      postalCode: "1209",
      addressCountry: "BD",
    },
    sameAs: [
      settings.socials.facebook,
      settings.socials.instagram,
      settings.socials.youtube,
      settings.socials.linkedin,
    ].filter(Boolean),
  };

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Sunset Kuakata Hotel & Resort",
    description:
      "First five-star-equivalent hotel in Kuakata. Sunrise, sunset and Sundarbans in one frame, developed under the KTC Master Plan.",
    url: "https://sunsetgroupbd.com/projects/kuakata-hotel",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuakata",
      addressRegion: "Patuakhali",
      addressCountry: "BD",
    },
    telephone: settings.phone,
  };

  return (
    <html
      lang="bn"
      className={`${playfair.variable} ${poppins.variable} ${notoSerifBengali.variable} ${hindSiliguri.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1096546022397949');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1096546022397949&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col bg-white text-ink selection:bg-green-900 selection:text-white">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:text-xs uppercase tracking-wider rounded-md"
        >
          Skip to content
        </a>

        <LanguageProvider>
          <Header />
          <main id="main-content" className="flex-1 w-full">
            {children}
          </main>
          <Footer settings={settings} />
          <FloatingWhatsApp phone={settings.whatsapp} />
          <InvestmentLeadPopup />
        </LanguageProvider>
      </body>
    </html>
  );
}
