import type { MetadataRoute } from "next";

import type { SITEMAP_POSTS_QUERY_RESULT } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { SITEMAP_POSTS_QUERY } from "@/sanity/lib/queries";

const baseUrl = "https://theweborigin.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: SITEMAP_POSTS_QUERY_RESULT = [];
  try {
    posts = await client.withConfig({ useCdn: false }).fetch(SITEMAP_POSTS_QUERY);
  } catch (err) {
    console.warn("[sitemap] Failed to fetch posts from Sanity:", err);
  }

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...blogEntries,
  ];
}
