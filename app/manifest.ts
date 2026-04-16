import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Web Origin — Digital Studio",
    short_name: "Web Origin",
    description: "Digital Studio for Ambitious Brands",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#050508",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
