import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "404 — Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-6 text-center"
    >
      <p className="font-funnel text-sm uppercase tracking-[0.2em] text-foreground/50">
        404
      </p>
      <h1 className="mt-4 font-funnel text-5xl md:text-7xl font-semibold tracking-tight text-foreground">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-lg text-foreground/60">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
        >
          Read the blog
        </Link>
      </div>
    </main>
  );
}
