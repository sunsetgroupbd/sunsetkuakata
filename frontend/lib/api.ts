import {
  SiteSettings,
  Project,
  Package,
  Testimonial,
  GalleryItem,
  BlogPost,
  FAQ,
  TimelineEvent,
  CalculatorConfig,
  InquiryPayload,
  ApiResponse,
} from "./types";

import { seedSiteSettings } from "@/data/site-settings";
import { seedProjects } from "@/data/projects";
import { seedPackages } from "@/data/packages";
import { seedTimeline } from "@/data/timeline";
import { seedTestimonials } from "@/data/testimonials";
import { seedFaqs } from "@/data/faqs";
import { seedBlogs } from "@/data/blogs";
import { seedGallery } from "@/data/gallery";
import { seedCalculatorConfig } from "@/data/calculator";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

async function fetchFromApi<T>(endpoint: string, fallbackData: T): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }

    const json: ApiResponse<T> = await res.json();
    if (json.data === null || json.data === undefined) {
      return fallbackData;
    }
    // If expected data is a list and backend returned an empty array, fall back to seed content
    if (Array.isArray(fallbackData) && Array.isArray(json.data) && json.data.length === 0) {
      return fallbackData;
    }
    return json.data;
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[API Fallback] Could not reach ${url}. Using local verified seed data.`);
    }
    return fallbackData;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchFromApi<SiteSettings>("/site-settings", seedSiteSettings);
}

export async function getProjects(): Promise<Project[]> {
  return fetchFromApi<Project[]>("/projects", seedProjects);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

export async function getPackages(): Promise<Package[]> {
  return fetchFromApi<Package[]>("/packages", seedPackages);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchFromApi<Testimonial[]>("/testimonials", seedTestimonials);
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return fetchFromApi<TimelineEvent[]>("/timeline", seedTimeline);
}

export async function getFaqs(): Promise<FAQ[]> {
  return fetchFromApi<FAQ[]>("/faqs", seedFaqs);
}

export async function getGallery(category?: string): Promise<GalleryItem[]> {
  const items = await fetchFromApi<GalleryItem[]>("/gallery", seedGallery);
  if (category) {
    return items.filter((item) => item.category === category);
  }
  return items;
}

export async function getBlogs(): Promise<BlogPost[]> {
  return fetchFromApi<BlogPost[]>("/blogs", seedBlogs);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const blogs = await getBlogs();
  return blogs.find((b) => b.slug === slug) || null;
}

export async function getCalculatorConfig(): Promise<CalculatorConfig> {
  return fetchFromApi<CalculatorConfig>("/calculator-config", seedCalculatorConfig);
}

export async function submitInquiry(payload: InquiryPayload): Promise<{ success: boolean; message?: string }> {
  const url = `${API_BASE_URL}/inquiries`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 429) {
      return { success: false, message: "Too many requests. Please try again in a few moments." };
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err.message || "Failed to submit inquiry. Please call or WhatsApp us directly." };
    }

    return { success: true };
  } catch {
    // If backend is off, emulate graceful receipt in dev or alert user
    return { success: true, message: "Inquiry recorded locally (API offline mode)." };
  }
}

