export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  officeHours: string;
  socials: SocialLinks;
  brochureUrl: string | null;
}

export interface Project {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  summaryEn: string;
  summaryBn: string;
  bodyEn: string;
  bodyBn: string;
  highlightsEn: string[];
  highlightsBn: string[];
  servicesEn?: string[];
  servicesBn?: string[];
  location: string;
  heroImage: string;
  gallery: string[];
  order: number;
  status: "active" | "planned" | "upcoming";
  ownershipTotal?: number;
  sellableTotal?: number; // ADMIN-ONLY, never in public API
  totalUnits?: number;
  totalLandSft?: number;
  totalBuildSft?: number;
  landAyutangsho?: number;
}

export type PackageTier = "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";

export interface Package {
  id: string;
  projectSlug: string;
  tier: PackageTier;
  slug: string;
  nameEn: string;
  nameBn: string;
  unitMultiplier: number; // 1 | 3 | 5 | 10
  price: number;
  bookingMoney: number;
  landSft?: number;
  buildSft?: number;
  areaSft: number; // Total area
  stayDays?: number; // UI label: Accommodation days
  dayProfitDays?: number; // Day profit days
  stayDaysDfi?: number; // combo only
  discountPercent?: number;
  nominatedPeople?: number;
  insuranceCoverage?: number;
  ownershipCount?: number; // ADMIN-ONLY
  featured?: boolean;
  order?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  roleEn: string;
  roleBn: string;
  quoteEn: string;
  quoteBn: string;
  photo?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  captionEn: string;
  captionBn: string;
  category: "hotel" | "location" | "site" | "events";
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  titleEn: string;
  titleBn: string;
  descriptionEn?: string;
  descriptionBn?: string;
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  bodyEn: string;
  bodyBn: string;
  coverImage: string;
  publishedAt: string;
}

export interface FAQ {
  id: string;
  questionEn: string;
  questionBn: string;
  answerEn: string;
  answerBn: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  status: "done" | "planned";
}

export interface CalculatorConfig {
  rates: {
    [packageSlug: string]: number | null;
  };
}

export interface InquiryPayload {
  fullName: string;
  phone: string;
  email?: string;
  projectSlug: string;
  packageSlug?: string;
  message?: string;
  website?: string; // honeypot field
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

