import type { PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";

const calloutStyles: Record<string, string> = {
  info: "border-sky-500/30 bg-sky-500/5 text-sky-100",
  tip: "border-emerald-500/30 bg-emerald-500/5 text-emerald-100",
  warning: "border-amber-500/30 bg-amber-500/5 text-amber-100",
};

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-14 mb-5 text-3xl md:text-4xl font-funnel font-semibold tracking-tight text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 text-2xl md:text-3xl font-funnel font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 text-xl md:text-2xl font-funnel font-semibold tracking-tight text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-5 text-base md:text-lg leading-relaxed text-foreground/80">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-foreground/30 pl-6 italic text-foreground/70 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 ml-6 list-disc space-y-2 text-foreground/80">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 ml-6 list-decimal space-y-2 text-foreground/80">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    ),
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    "strike-through": ({ children }) => (
      <span className="line-through opacity-70">{children}</span>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const newTab = value?.openInNewTab !== false;
      const rel = [
        newTab ? "noopener" : null,
        newTab ? "noreferrer" : null,
        value?.noFollow ? "nofollow" : null,
      ]
        .filter(Boolean)
        .join(" ");
      return (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={rel || undefined}
          className="text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground transition"
        >
          {children}
        </a>
      );
    },
    internalLink: ({ value, children }) => {
      const slug = value?.slug;
      const type = value?.type;
      if (!slug) return <>{children}</>;
      const path = type === "post" ? `/blog/${slug}` : `/blog?category=${slug}`;
      return (
        <Link
          href={path}
          className="text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground transition"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1600).fit("max").url();
      if (!url) return null;
      const dimensions = value?.asset?.metadata?.dimensions;
      const lqip = value?.asset?.metadata?.lqip;
      return (
        <figure className="my-10">
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5">
            <Image
              src={url}
              alt={value?.alt ?? ""}
              width={dimensions?.width ?? 1600}
              height={dimensions?.height ?? 900}
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-3 text-center text-sm text-foreground/60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const tone: string = value?.tone ?? "info";
      const styles = calloutStyles[tone] ?? calloutStyles.info;
      return (
        <aside
          className={`my-8 rounded-xl border px-5 py-4 text-base ${styles}`}
        >
          {value?.body}
        </aside>
      );
    },
    code: ({ value }) => (
      <pre className="my-8 overflow-x-auto rounded-xl border border-foreground/10 bg-black/40 p-4 text-sm font-mono text-foreground/90">
        {value?.filename && (
          <span className="mb-3 block text-xs uppercase tracking-wider text-foreground/40">
            {value.filename}
          </span>
        )}
        <code>{value?.code}</code>
      </pre>
    ),
  },
};
