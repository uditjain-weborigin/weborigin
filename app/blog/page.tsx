import type { Metadata } from "next";
import Link from "next/link";

import { PostCard } from "@/components/blog/post-card";
import { resolveOpenGraphImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  FEATURED_POST_QUERY,
  POSTS_COUNT_QUERY,
  POSTS_QUERY,
  SETTINGS_QUERY,
} from "@/sanity/lib/queries";

const POSTS_PER_PAGE = 9;

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });

  const title = settings?.title || "Insights — Web Origin";
  const description =
    settings?.description ||
    "Field notes on web design, performance, SEO, and brand strategy from Web Origin Studio.";
  const og = resolveOpenGraphImage(settings?.ogImage);

  return {
    title,
    description,
    alternates: { canonical: "/blog" },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/blog",
      images: og ? [og] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: og ? [og.url] : undefined,
    },
  };
}

type SearchParams = Promise<{ page?: string }>;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(parseInt(pageParam || "1", 10) || 1, 1);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const [{ data: settings }, { data: featured }, { data: posts }, { data: total }] =
    await Promise.all([
      sanityFetch({ query: SETTINGS_QUERY }),
      sanityFetch({ query: FEATURED_POST_QUERY }),
      sanityFetch({ query: POSTS_QUERY, params: { start, end } }),
      sanityFetch({ query: POSTS_COUNT_QUERY }),
    ]);

  const totalPages = Math.max(Math.ceil((total ?? 0) / POSTS_PER_PAGE), 1);
  const allPosts = posts ?? [];
  const featuredPost = featured;
  const featuredId = featuredPost?._id;
  const filtered = allPosts.filter((p) => p._id !== featuredId);

  return (
    <main id="main-content" className="relative">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:pt-40 md:pb-16">
        <p className="font-funnel text-sm uppercase tracking-[0.2em] text-foreground/50">
          {settings?.title || "Insights"}
        </p>
        <h1 className="mt-4 font-funnel text-5xl md:text-7xl font-semibold tracking-tight text-foreground">
          Ideas, notes & deep dives
        </h1>
        {settings?.description && (
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-foreground/60">
            {settings.description}
          </p>
        )}
      </section>

      {page === 1 && featuredPost && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <PostCard post={featuredPost} variant="featured" priority />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-foreground/15 p-12 text-center text-foreground/60">
            <p className="text-lg">No posts published yet.</p>
            <p className="mt-2 text-sm">
              Head over to{" "}
              <Link href="/studio" className="underline underline-offset-4">
                /studio
              </Link>{" "}
              to publish your first article.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mt-16 flex items-center justify-center gap-2 text-sm"
          >
            {Array.from({ length: totalPages }).map((_, i) => {
              const target = i + 1;
              const isActive = target === page;
              const href = target === 1 ? "/blog" : `/blog?page=${target}`;
              return (
                <Link
                  key={target}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 transition ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {target}
                </Link>
              );
            })}
          </nav>
        )}
      </section>
    </main>
  );
}
