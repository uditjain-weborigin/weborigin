import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return undefined;
  return builder.image(source).auto("format").fit("max");
}

type OgImageSource = SanityImageSource & { alt?: string | null };

export function resolveOpenGraphImage(
  image: OgImageSource | undefined | null,
  width = 1200,
  height = 627,
) {
  if (!image) return undefined;
  const url = urlForImage(image)?.width(width).height(height).fit("crop").url();
  if (!url) return undefined;
  return { url, alt: image.alt ?? "", width, height };
}
