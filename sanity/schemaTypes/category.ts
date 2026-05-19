import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Used on category pages and meta tags.",
    }),
    defineField({
      name: "color",
      title: "Color Tag",
      type: "string",
      description: "Used to visually distinguish category badges.",
      options: {
        list: [
          { title: "Slate", value: "slate" },
          { title: "Indigo", value: "indigo" },
          { title: "Emerald", value: "emerald" },
          { title: "Amber", value: "amber" },
          { title: "Rose", value: "rose" },
          { title: "Sky", value: "sky" },
        ],
        layout: "radio",
      },
      initialValue: "slate",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
