import { Metadata } from "next";
import { getBlogs } from "@/lib/api";
import { BlogsClient } from "./BlogsClient";

export const metadata: Metadata = {
  title: "Blog & Insights | Sunset Kuakata Hotel & Resort",
  description:
    "Articles, regulatory insights, and sector news regarding Kuakata tourism, saf-kabala registration, and Shariah-compliant hospitality.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return <BlogsClient blogs={blogs} />;
}
