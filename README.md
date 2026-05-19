# weborigin

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_DNwejqlIQe1jwrVIHZoYVsbpVBDR)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Sanity Blog (CMS)

The blog at `/blog` is powered by [Sanity](https://www.sanity.io). Content editors manage everything from the embedded Studio at `/studio`.

### One-time setup

1. **Create a read token** at <https://www.sanity.io/manage/project/z7lt73v0/api#tokens>
   - Click *Add API token*
   - Name: `Web Origin — Live Content`
   - Permissions: **Viewer**
   - Copy the value into `SANITY_API_READ_TOKEN` in `.env.local`

2. **(Optional) Pick a webhook secret** — any long random string. Put the same value into `SANITY_REVALIDATE_SECRET` in `.env.local` and into the Sanity webhook (step 4).

3. **Restart the dev server** so the new env vars take effect:
   ```bash
   pnpm dev
   ```

4. **(Optional) Set up the revalidation webhook** so changes appear on the public site within seconds. In <https://www.sanity.io/manage/project/z7lt73v0/api#webhooks>:
   - URL: `https://theweborigin.com/api/revalidate`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["post", "blogSettings", "author", "category"]`
   - Projection: `{ _type, "slug": slug.current, "tags": [_type, _type + ":" + slug.current] }`
   - Secret: same value as `SANITY_REVALIDATE_SECRET`

### Content team workflow

| URL | Purpose |
|------|----------|
| `/studio` | Sanity Studio (login with same Sanity account that has access to the project) |
| `/blog` | Public blog listing |
| `/blog/[slug]` | Individual blog post |

Inside the Studio, content can be drafted and previewed before publishing. The "Presentation" tool gives a click-to-edit overlay on top of the live site.

### Schema overview

| Type | Notes |
|------|-------|
| `post` | Title, slug, excerpt, cover image, body (Portable Text), author, categories, SEO fields |
| `author` | Name, slug, role, picture, bio, social links |
| `category` | Title, slug, description, color |
| `blogSettings` | Site-wide blog title, description and default social image |

### Useful scripts

```bash
pnpm dev               # Start Next.js dev server (Studio at /studio)
pnpm build             # Production build
pnpm sanity:typegen    # Regenerate types after schema changes
pnpm sanity:deploy     # Deploy a hosted Studio (if you choose to)
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Sanity Documentation](https://www.sanity.io/docs) - schemas, GROQ, Studio customization.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/uditj66/weborigin" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
