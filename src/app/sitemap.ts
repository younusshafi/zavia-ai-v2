import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zavia-ai.com";
  const pages = ["", "/about", "/services", "/projects", "/architecture", "/industries", "/team", "/future", "/contact"];
  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1 : 0.8,
  }));
}
