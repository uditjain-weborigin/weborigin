import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const blogSettings = defineType({
  name: "blogSettings",
  title: "Blog Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Blog Title",
      type: "string",
      description: "Used as <h1> on the blog listing & in default SEO title.",
      initialValue: "Insights",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Blog Description",
      type: "text",
      rows: 3,
      description:
        "Tagline shown on the blog listing page and used as default meta description.",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Image",
      type: "image",
      description:
        "Used for blog listing & as a fallback for posts without their own social image.",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Blog Settings" }),
  },
});
