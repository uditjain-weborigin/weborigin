import { defineField } from "sanity";

export const seoFields = defineField({
  name: "seo",
  title: "SEO & Social",
  type: "object",
  group: "seo",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "Overrides the page title in search results. Aim for 50–60 characters.",
      validation: (rule) =>
        rule
          .max(70)
          .warning("Meta titles longer than 70 characters get truncated by Google."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Aim for 140–160 characters. Used in search snippets.",
      validation: (rule) =>
        rule
          .max(180)
          .warning("Meta descriptions longer than 180 characters get truncated."),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description:
        "Falls back to the cover image if not set. Recommended: 1200 × 627.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      description: "If on, adds noindex meta tag (use sparingly).",
      initialValue: false,
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Optional. Use only if this content was originally published elsewhere.",
    }),
  ],
});
