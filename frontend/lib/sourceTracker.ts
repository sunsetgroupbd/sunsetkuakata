export function detectLeadSource(): string {
  if (typeof window === "undefined") return "Website Direct";
  try {
    const search = window.location.search.toLowerCase();
    const referrer = (document.referrer || "").toLowerCase();

    if (
      search.includes("fbclid=") ||
      search.includes("utm_source=facebook") ||
      search.includes("utm_source=fb") ||
      referrer.includes("facebook.com") ||
      referrer.includes("instagram.com")
    ) {
      return "Facebook Ad";
    }

    if (
      search.includes("utm_source=google") ||
      referrer.includes("google.com") ||
      referrer.includes("google.com.bd")
    ) {
      return "Google Search";
    }

    if (search.includes("utm_source=whatsapp") || referrer.includes("whatsapp")) {
      return "WhatsApp";
    }

    if (search.includes("utm_source=")) {
      const match = window.location.search.match(/[?&]utm_source=([^&]+)/i);
      if (match && match[1]) return decodeURIComponent(match[1]);
    }

    return "Website Direct";
  } catch {
    return "Website Direct";
  }
}
