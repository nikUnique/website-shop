# Tech Context

## Technology Stack

- **Framework**: Next.js 16.2.2 (App Router, Turbopack)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Class merging**: `clsx` + `tailwind-merge`
- **Fonts**: Google Fonts (Geist Sans, Geist Mono)
- **Deployment**: Cloudflare Pages (static export)
- **Package manager**: npm

## Development Setup

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
```

## Dependencies (package.json)

### Runtime
- `next` 16.2.2
- `react` / `react-dom`
- `lucide-react` — icon library
- `clsx` + `tailwind-merge` — conditional class merging

### Dev
- `typescript`
- `@tailwindcss/postcss`
- `eslint` + Next.js ESLint config
- `@types/react`

## Technical Constraints

1. **Static export only**: No API routes, no server-side code at runtime. Everything is client-side or pre-rendered at build time.
2. **No image optimization**: `images.unoptimized: true` in Next.js config because output is static. All images served from `/public/images/`.
3. **localStorage for cart**: No server-side state. Cart persists in browser localStorage, synced via React Context.
