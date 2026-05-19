import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { Funnel_Display } from "next/font/google";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

// Lazy-load anything that isn't needed for the initial paint.
// All three of these only inject scripts (no critical SSR markup), so
// keeping them as code-split chunks is fine — the page still SSRs.
const Analytics = dynamic(() =>
  import("@vercel/analytics/next").then((m) => m.Analytics),
);
const VisualEditing = dynamic(() =>
  import("next-sanity/visual-editing").then((m) => m.VisualEditing),
);
const SanityLive = dynamic(() =>
  import("@/sanity/lib/live").then((m) => m.SanityLive),
);

// Single variable font drives every heading, body, and display weight.
// Removing Outfit + DM Sans saves ~14 font requests on first paint.
const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel",
  // Only ship the weights actually used (400/500/600/700)
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://theweborigin.com";

export const metadata: Metadata = {
  title: "Web Origin — Digital Studio for Ambitious Brands",
  description:
    "We design and build high-performance web experiences for startups and enterprises. Strategy, design, and development under one roof.",
  keywords: [
    "web design",
    "web development",
    "digital agency",
    "UI/UX",
    "SEO",
    "app development",
    "India",
    "delhi",
    "Ghaziabad",
  ],
  authors: [{ name: "Web Origin Studio" }],
  metadataBase: new URL(baseUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Web Origin — Digital Studio for Ambitious Brands",
    description:
      "We build high-performance websites that rank, convert, and scale. Strategy, design & dev under one roof.",
    url: "https://theweborigin.com",
    siteName: "Web Origin",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Web Origin — Digital Studio for Ambitious Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Origin — Digital Studio for Ambitious Brands",
    description:
      "We build high-performance websites that rank, convert, and scale.",
    creator: "@weborigin_in",
    site: "@weborigin_in",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${funnelDisplay.variable} font-sans antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Web Origin",
              url: baseUrl,
              logo: `${baseUrl}/icon.svg`,
              description:
                "We design and build high-performance web experiences for startups and enterprises.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Delhi",
                addressRegion: "Delhi",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "hello@theweborigin.com",
                contactType: "customer service",
              },
              sameAs: [
                "https://twitter.com/weborigin_in",
                "https://instagram.com/weborigin.in",
                "https://linkedin.com/company/weborigin",
                "https://github.com/weborigin",
              ],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-semibold"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        {/* Only spin up the Sanity Live runtime when in draft preview — saves ~30KB JS + a long-lived EventSource on every public visit */}
        {isDraftMode && (
          <Suspense fallback={null}>
            <SanityLive />
            <VisualEditing />
          </Suspense>
        )}
        {process.env.NODE_ENV === "production" && (
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        )}
      </body>
    </html>
  );
}
