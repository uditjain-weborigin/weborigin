import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostCard } from "@/components/blog/post-card";
import { portableTextComponents } from "@/components/blog/portable-text-components";
import { client } from "@/sanity/lib/client";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  MORE_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SEO_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
} from "@/sanity/lib/queries";

// IMPORTANT: never use VERCEL_URL here — it resolves to the preview deployment
// URL (e.g. my-project-abc.vercel.app), not the canonical production domain.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theweborigin.com";

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch(POST_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_SEO_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });

  if (!post) {
    return { title: "Post not found" };
  }

  const seoTitle = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    "Read this article on the Web Origin blog.";
  const ogImage =
    resolveOpenGraphImage(post.seo?.ogImage) ||
    resolveOpenGraphImage(post.coverImage);

  return {
    title: seoTitle,
    description,
    alternates: {
      canonical: post.seo?.canonicalUrl || `/blog/${slug}`,
    },
    robots: post.seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: seoTitle,
      description,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post._updatedAt ?? undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description,
      images: ogImage ? [ogImage.url] : undefined,
    },
  };
}

function estimateReadingTime(body: unknown): number {
  if (!Array.isArray(body)) return 1;
  const text = body
    .filter((b) => b && (b as { _type?: string })._type === "block")
    .flatMap(
      (b) =>
        ((b as { children?: Array<{ text?: string }> }).children ?? []).map(
          (c) => c.text ?? "",
        ),
    )
    .join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const [{ data: post }, { data: morePosts }] = await Promise.all([
    sanityFetch({ query: POST_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch({ query: MORE_POSTS_QUERY, params: { slug, limit: 3 } }),
  ]);

  if (!post) notFound();

  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(1800).fit("max").url()
    : null;
  const lqip = post.coverImage?.asset?.metadata?.lqip ?? undefined;
  const dimensions = post.coverImage?.asset?.metadata?.dimensions;
  const readingTime =
    post.estimatedReadingTime ?? estimateReadingTime(post.body);

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const cleanPost = stegaClean(post);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: cleanPost.title,
    description: cleanPost.excerpt ?? undefined,
    image: coverUrl ? [coverUrl] : undefined,
    datePublished: cleanPost.publishedAt ?? undefined,
    dateModified: cleanPost._updatedAt ?? cleanPost.publishedAt ?? undefined,
    author: cleanPost.author?.name
      ? {
          "@type": "Person",
          name: cleanPost.author.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Web Origin",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };

  return (
    <main id="main-content" className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40">
        <nav className="mb-8 text-sm text-foreground/50">
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
            ← Back to all posts
          </Link>
        </nav>

        {post.categories && post.categories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat._id}
                className="inline-flex items-center rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground/70"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-funnel text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-6 text-xl md:text-2xl text-foreground/60 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/60">
          {post.author?.name && (
            <div className="flex items-center gap-3">
              {post.author.picture?.asset?.url && (
                <Image
                  src={post.author.picture.asset.url}
                  alt={stegaClean(post.author.name) ?? ""}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-medium text-foreground">
                  {post.author.name}
                </div>
                {post.author.role && (
                  <div className="text-xs text-foreground/50">
                    {post.author.role}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            {publishedDate && (
              <time dateTime={post.publishedAt ?? undefined}>
                {publishedDate}
              </time>
            )}
            <span aria-hidden="true">·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>

        {coverUrl && (
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <Image
              src={coverUrl}
              alt={stegaClean(post.coverImage?.alt) ?? post.title}
              width={dimensions?.width ?? 1800}
              height={dimensions?.height ?? 1000}
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
        )}

        <div className="prose-blog mt-14">
          {post.body && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
        </div>
      </article>

      {morePosts && morePosts.length > 0 && (
        <section className="border-t border-foreground/10 bg-foreground/2 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-funnel text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Keep reading
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {morePosts.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
