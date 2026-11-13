import { Metadata } from "next";
import { getPackages } from "@/lib/api";
import { PackagesClient } from "./PackagesClient";

export const metadata: Metadata = {
  title: "Ownership Packages | Sunset Kuakata Hotel & Resort",
  description:
    "Ownership packages for Sunset Kuakata Hotel & Resort: Platinum, Gold, Silver, and Bronze tiers with defined booking amounts, land & build allocations, and accommodation days.",
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return <PackagesClient packages={packages} />;
}
