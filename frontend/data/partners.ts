export interface PartnerLogo {
  id: number;
  name: string;
  src: string;
}

export interface PartnerPhoto {
  id: number;
  src: string;
  alt: string;
  captionEn?: string;
  captionBn?: string;
}

export const partnerLogos: PartnerLogo[] = [
  { id: 1, name: "Interactive Cares", src: "/images/companylogos/Logos_1.png" },
  { id: 2, name: "Farazy Hospital Ltd.", src: "/images/companylogos/Logos_2.jpg" },
  { id: 3, name: "AMZ Hospital Ltd.", src: "/images/companylogos/Logos_3.png" },
  { id: 4, name: "Dhanmondi Diagnostic & Consultation Center", src: "/images/companylogos/Logos_4.png" },
  { id: 5, name: "Nagorik Specialized Hospital", src: "/images/companylogos/Logos_5.jpg" },
  { id: 6, name: "Rizio", src: "/images/companylogos/Logos_6.jpg" },
  { id: 7, name: "Farxa", src: "/images/companylogos/Logos_7.jpg" },
  { id: 8, name: "Trandzzy", src: "/images/companylogos/Logos_8.png" },
  { id: 10, name: "Farazy Dental", src: "/images/companylogos/Logos_10.png" },
  { id: 11, name: "ASK Trade & Exhibitions", src: "/images/companylogos/Logos_11.png" },
  { id: 12, name: "Indira IVF", src: "/images/companylogos/Logos_12.png" },
  { id: 13, name: "TKISD", src: "/images/companylogos/Logos_13.png" },
  { id: 14, name: "Coffee Express", src: "/images/companylogos/Logos_14.png" },
  { id: 15, name: "Healthcare & Corporate Partner", src: "/images/companylogos/Logos_15.png" },
];

export const mouSigningPhotos: PartnerPhoto[] = [
  {
    id: 1,
    src: "/images/2.webp",
    alt: "Memorandum of Understanding signing with healthcare partner",
    captionEn: "MoU Signing Ceremony with Esteemed Healthcare Partners",
    captionBn: "স্বাস্থ্যসেবা অংশীদারদের সাথে সমঝোতা স্মারক স্বাক্ষর অনুষ্ঠান",
  },
  {
    id: 2,
    src: "/images/3.webp",
    alt: "Official partnership ceremony with corporate executives",
    captionEn: "Executive Partnership Agreement Signing",
    captionBn: "শীর্ষ কর্মকর্তাদের সাথে অংশীদারিত্ব চুক্তি স্বাক্ষর",
  },
  {
    id: 3,
    src: "/images/10.webp",
    alt: "Signing ceremony at Mangrove Sunset Kuakata Hotel & Resort",
    captionEn: "MoU at Mangrove Sunset Kuakata Hotel & Resort Ltd.",
    captionBn: "ম্যানগ্রোভ সানসেট কুয়াকাটা হোটেল অ্যান্ড রিসোর্ট লি. এর সমঝোতা স্মারক",
  },
  {
    id: 4,
    src: "/images/11.webp",
    alt: "Formal agreement exchange with institutional partners",
    captionEn: "Formal Agreement Exchange with Institutional Partners",
    captionBn: "প্রাতিষ্ঠানিক অংশীদারদের সাথে আনুষ্ঠানিক চুক্তি বিনিময়",
  },
  {
    id: 5,
    src: "/images/12.webp",
    alt: "AMZ Hospital MoU signing ceremony",
    captionEn: "AMZ Hospital Partnership Signing Ceremony",
    captionBn: "এএমজেড হসপিটালের সাথে চুক্তি স্বাক্ষর অনুষ্ঠান",
  },
  {
    id: 6,
    src: "/images/13.webp",
    alt: "Corporate collaboration signing session",
    captionEn: "Marking the Beginning of a Promising Collaboration",
    captionBn: "একটি সম্ভাবনাময় যৌথ সহযোগিতার সূচনা",
  },
  {
    id: 7,
    src: "/images/1.webp",
    alt: "Official signing and partnership milestone",
    captionEn: "Sunset Kuakata Partnership MoU Milestone",
    captionBn: "সানসেট কুয়াকাটা অংশীদারিত্বের সমঝোতা স্মারক",
  },
  {
    id: 8,
    src: "/images/20.webp",
    alt: "Corporate leaders and partners assembly",
    captionEn: "Executive Partnership Summit & Network Assembly",
    captionBn: "কর্পোরেট অংশীদার ও নির্বাহী সম্মেলন",
  },
];

export const familyOwnerPhotos: PartnerPhoto[] = [
  {
    id: 9,
    src: "/images/14.webp",
    alt: "Sunset Kuakata hotel owners receiving saf-kabala registration deeds",
    captionEn: "Saf-Kabala Registration Deed Handover to Valued Owners",
    captionBn: "সম্মানিত মালিকদের কাছে সাফ-কবালা দলিল হস্তান্তর",
  },
  {
    id: 10,
    src: "/images/15.webp",
    alt: "Investors visiting the development site in Kuakata",
    captionEn: "Investor Delegation at Sunset Kuakata Site",
    captionBn: "কুয়াকাটা প্রকল্প পরিদর্শনে বিনিয়োগকারী প্রতিনিধি দল",
  },
  {
    id: 11,
    src: "/images/16.webp",
    alt: "Owner celebration and certificate distribution",
    captionEn: "Owner Community & Saf-Kabala Certificate Celebration",
    captionBn: "মালিকদের মিলনমেলা ও মালিকানা সনদ প্রদান",
  },
  {
    id: 12,
    src: "/images/17.webp",
    alt: "Family investors standing proudly at project headquarters",
    captionEn: "Family Investors at Dhanmondi Corporate Headquarters",
    captionBn: "ধানমন্ডি প্রধান কার্যালয়ে বিনিয়োগকারী পরিবারের সদস্যবৃন্দ",
  },
  {
    id: 13,
    src: "/images/18.webp",
    alt: "Partnership and ownership deed verification session",
    captionEn: "Deed Registration & Ownership Documentation",
    captionBn: "দলিল নিবন্ধন ও মালিকানা নথিপত্র আনুষ্ঠানিক হস্তান্তর",
  },
  {
    id: 14,
    src: "/images/19.webp",
    alt: "Community of proud Sunset owners",
    captionEn: "They Are Part of Our Family — Growing Community of Owners",
    captionBn: "তারা আমাদের পরিবারের অংশ — সানসেট মালিক পরিবারের সদস্যবৃন্দ",
  },
  {
    id: 15,
    src: "/images/14.webp",
    alt: "Owner receiving registered deed documents",
    captionEn: "Saf-Kabala Registered Deed Distribution",
    captionBn: "নিবন্ধিত সাফ-কবালা দলিল হস্তান্তর",
  },
  {
    id: 16,
    src: "/images/16.webp",
    alt: "Valued ownership community assembly",
    captionEn: "Celebration of Sunset Family Ownership",
    captionBn: "সানসেট পরিবারের মালিকানা উদযাপন",
  },
];

