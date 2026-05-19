import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { SINGLETON_TYPES, structure } from "./sanity/structure";

const previewUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_URL || "/";

export default defineConfig({
  name: "default",
  title: "Web Origin Blog",
  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) =>
            action ? ["publish", "discardChanges", "restore"].includes(action) : false,
          )
        : input,
  },

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: typeof location === "undefined" ? previewUrl : location.origin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
