import { ImageIcon, LinkIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          {
            name: "link",
            title: "External Link",
            type: "object",
            icon: LinkIcon,
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "openInNewTab",
                title: "Open in new tab",
                type: "boolean",
                initialValue: true,
              }),
              defineField({
                name: "noFollow",
                title: "No-follow link",
                type: "boolean",
                description: "Add rel='nofollow' (use for sponsored/UGC links).",
                initialValue: false,
              }),
            ],
          },
          {
            name: "internalLink",
            title: "Internal Link",
            type: "object",
            icon: LinkIcon,
            fields: [
              defineField({
                name: "reference",
                title: "Reference",
                type: "reference",
                to: [{ type: "post" }, { type: "category" }],
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Important for SEO and accessibility.",
          validation: (rule) =>
            rule
              .required()
              .error("Alt text is required for accessibility & SEO."),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        defineField({
          name: "tone",
          title: "Tone",
          type: "string",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: "body", subtitle: "tone" },
      },
    }),
    defineArrayMember({
      name: "code",
      title: "Code Block",
      type: "object",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          options: {
            list: [
              "typescript",
              "javascript",
              "tsx",
              "jsx",
              "html",
              "css",
              "bash",
              "json",
              "yaml",
              "groq",
              "sql",
              "python",
            ],
          },
          initialValue: "typescript",
        }),
        defineField({
          name: "code",
          title: "Code",
          type: "text",
          rows: 8,
        }),
        defineField({
          name: "filename",
          title: "Filename",
          type: "string",
        }),
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
      },
    }),
  ],
});
