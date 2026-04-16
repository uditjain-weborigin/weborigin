import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans, Funnel_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Funnel Display — used by navbar & hero components (replaces Google Fonts @import waterfall)
const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  variable: "--font-funnel",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

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
  metadataBase: new URL("https://www.theweborigin.com/"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Web Origin — Digital Studio for Ambitious Brands",
    description:
      "We build high-performance websites that rank, convert, and scale. Strategy, design & dev under one roof.",
    url: "https://weborigin.in",
    siteName: "Web Origin",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Origin — Digital Studio for Ambitious Brands",
    description:
      "We build high-performance websites that rank, convert, and scale.",
    creator: "@weborigin_in",
    site: "@weborigin_in",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${dmSans.variable} ${funnelDisplay.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
