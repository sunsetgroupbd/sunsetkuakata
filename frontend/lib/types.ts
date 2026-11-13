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
}

export interface Package {
  id: string;
  slug: string;
  nameEn: string;
  nameBn: string;
  price: number;
  bookingMoney: number;
  profitPeriodDays: number;
  featured: boolean;
  order: number;
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

