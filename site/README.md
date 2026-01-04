# Magicaret Site

This directory contains the Magicaret project homepage.

## Development

Run the site locally:

```bash
pnpm run site
```

Then open http://localhost:8000 in your browser.

## Deployment to Cloudflare Workers

The site is configured to be deployed to Cloudflare Workers Pages using `wrangler.toml`.

### Prerequisites

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

### Deploy

```bash
wrangler pages deploy ./site --project-name=magicaret
```

### First-time Setup

If this is your first deployment, create the project:

```bash
wrangler pages project create magicaret
```

## Building

The site uses the built library from the `dist` directory. After making changes to the library:

```bash
pnpm run build
```

This will update the `dist` directory, which is then copied to `site/dist` for the site to use.