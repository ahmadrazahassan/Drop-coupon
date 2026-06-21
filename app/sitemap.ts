import { MetadataRoute } from "next";
import { getCategories, getStores } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dropcoupon.com";

  // Static routes
  const staticRoutes = [
    "",
    "/top",
    "/about",
    "/contact",
    "/careers",
    "/privacy",
    "/terms",
    "/cookies",
    "/affiliate-disclosure",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Store routes
  const storeRoutes = getStores().map((store) => ({
    url: `${baseUrl}/store/${store.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Category routes
  const categoryRoutes = getCategories().map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...storeRoutes, ...categoryRoutes];
}
