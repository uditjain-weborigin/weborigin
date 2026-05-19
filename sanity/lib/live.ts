import { defineLive } from "next-sanity/live";

import { client } from "./client";

const rawToken = process.env.SANITY_API_READ_TOKEN;
const token: string | false = rawToken && rawToken.length > 0 ? rawToken : false;

const liveClient = client.withConfig({ useCdn: false });

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: token,
  browserToken: token,
});
