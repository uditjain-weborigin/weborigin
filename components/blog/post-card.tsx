import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

import type { POSTS_QUERY_RESULT } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/image";

const categoryColorMap: Record<string, string> = {
  slate: "bg-slate-500/15 text-slate-200 ring-slate-500/30",
  indigo: "bg-indigo-500/15 text-indigo-200 ring-indigo-500/30",
  emerald: "bg-emerald-500/15 text-emerald-200 ring-emerald-500/30",
  amber: "bg-amber-500/15 text-amber-200 ring-amber-500/30",
  rose: "bg-rose-500/15 text-rose-200 ring-rose-500/30",
  sky: "bg-sky-500/15 text-sky-200 ring-sky-500/30",
};

export type PostCardData = POSTS_QUERY_RESULT[number];

type PostCardProps = {
  post: PostCardData;
  variant?: "default" | "featured";
  priority?: boolean;
};

export function PostCard({
  post,
  variant = "default",
  priority = false,
}: PostCardProps) {
  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage)
        ?.width(variant === "featured" ? 1600 : 800)
        .height(variant === "featured" ? 900 : 500)
        .fit("crop")
        .url()
    : null;
  const lqip = post.coverImage?.asset?.metadata?.lqip ?? undefined;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const isFeatured = variant === "featured";
  const slug = stegaClean(post.slug);
  const coverAlt = stegaClean(post.coverImage?.alt) ?? post.title;

  return (
    <article
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/2 transition-colors hover:border-foreground/30 ${
        isFeatured ? "md:flex-row" : ""
      }`}
    >
      <Link
        href={`/blog/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />

      {coverUrl && (
        <div
          className={`relative overflow-hidden bg-foreground/5 ${
            isFeatured
              ? "aspect-16/10 md:aspect-auto md:w-1/2"
              : "aspect-16/10"
          }`}
        >
          <Image
            src={coverUrl}
            alt={coverAlt}
            fill
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            sizes={
              isFeatured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div
        className={`flex flex-1 flex-col gap-4 p-6 ${
          isFeatured ? "md:p-8 lg:p-10" : ""
        }`}
      >
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.slice(0, 3).map((cat) => {
              const color = stegaClean(cat.color) ?? "slate";
              return (
                <span
                  key={cat._id}
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                    categoryColorMap[color] ?? categoryColorMap.slate
                  }`}
                >
                  {cat.title}
                </span>
              );
            })}
          </div>
        )}

        <h3
          className={`font-funnel font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground/90 ${
            isFeatured
              ? "text-3xl md:text-4xl lg:text-5xl"
              : "text-xl md:text-2xl"
          }`}
        >
          {post.title}
        </h3>

        {post.excerpt && (
          <p
            className={`text-foreground/60 ${
              isFeatured ? "text-base md:text-lg" : "text-sm md:text-base"
            } line-clamp-3`}
          >
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 text-sm text-foreground/50">
          {post.author?.name && <span>By {post.author.name}</span>}
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
        </div>
      </div>
    </article>
  );
}
