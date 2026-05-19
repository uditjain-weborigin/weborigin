import { defineQuery } from "next-sanity";

const POST_FIELDS = /* groq */ `
  _id,
  _type,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  coverImage {
    ...,
    asset->{
      _id,
      url,
      metadata { lqip, dimensions }
    },
    alt
  },
  estimatedReadingTime,
  author->{
    _id,
    name,
    "slug": slug.current,
    role,
    picture {
      ...,
      asset->{ _id, url, metadata { lqip } },
      alt
    }
  },
  categories[]->{
    _id,
    title,
    "slug": slug.current,
    color
  },
  seo
`;

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "blogSettings"][0]{
    title,
    description,
    ogImage {
      ...,
      asset->{ _id, url, metadata { lqip } }
    }
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc) [$start...$end] {
    ${POST_FIELDS}
  }
`);

export const POSTS_COUNT_QUERY = defineQuery(`
  count(*[_type == "post" && defined(slug.current)])
`);

export const FEATURED_POST_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && featured == true]
  | order(coalesce(publishedAt, _updatedAt) desc)[0] {
    ${POST_FIELDS}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

export const SITEMAP_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_FIELDS},
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{ _id, url, metadata { lqip, dimensions } }
      },
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug.current,
          "type": @.reference->_type
        }
      }
    }
  }
`);

export const MORE_POSTS_QUERY = defineQuery(`
  *[_type == "post" && slug.current != $slug && defined(slug.current)]
  | order(coalesce(publishedAt, _updatedAt) desc) [0...$limit] {
    ${POST_FIELDS}
  }
`);

export const POST_SEO_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    excerpt,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    author->{ name },
    coverImage {
      asset->{ url, metadata { dimensions } },
      alt
    },
    seo
  }
`);

export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    color
  }
`);
