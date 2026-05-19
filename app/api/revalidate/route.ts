import { revalidatePath, updateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
  slug?: string;
  tags?: string[];
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!body) {
      return new Response("Bad request", { status: 400 });
    }

    if (Array.isArray(body.tags) && body.tags.length) {
      body.tags.forEach((tag) => updateTag(tag));
    }

    if (body._type === "post") {
      revalidatePath("/blog");
      revalidatePath("/sitemap.xml");
      if (body.slug) revalidatePath(`/blog/${body.slug}`);
    }

    if (body._type === "blogSettings") {
      revalidatePath("/blog");
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug,
      tags: body.tags ?? [],
      now: Date.now(),
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
