# System Patterns

## Architecture

```
catalog-website/
├── data/products.json          # Single source of truth for product data
├── memory-bank/                 # Project context docs
├── public/images/               # Product photos
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx           # Root layout (CartProvider wrapper)
│   │   ├── page.tsx             # Main catalog page
│   │   ├── about/page.tsx       # About page
│   │   ├── contacts/page.tsx    # Contacts page
│   │   ├── delivery/page.tsx    # Delivery/pickup page
│   │   ├── product/[id]/page.tsx # Dynamic product detail (SSG)
│   │   ├── components/          # App-specific components
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── SiteHeader.tsx
│   │   │   └── SiteFooter.tsx
│   │   └── context/
│   │       └── CartContext.tsx  # React Context for cart state
│   ├── components/ui/           # Reusable UI primitives
│   │   ├── Breadcrumb.tsx
│   │   ├── Card.tsx             # 4 variants: default, outline, accent, ghost
│   │   ├── ContactItem.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── StepItem.tsx
│   │   └── index.ts             # Barrel export
│   ├── lib/
│   │   ├── config.ts            # Shop constants (name, address, phone, hours)
│   │   └── utils.ts             # cn() utility
│   └── types/
│       ├── data.d.ts            # Module declaration for products.json
│       └── product.ts           # Product type definition
```

## Key Technical Decisions

1. **Static Site Generation (SSG)**: `next.config.ts` uses `output: 'export'`, `images.unoptimized: true`. No server-side rendering at runtime.
2. **products.json as single data source**: Product data stored in `data/products.json`, read by catalog pages.
3. **No database**: All product data is static, served from `data/products.json`.
4. **Cart state**: React Context + localStorage (`CartContext.tsx`). Syncs on every `items` change.
5. **Ordering via WhatsApp**: `wa.me` link with pre-filled message — no cart checkout flow, no payment.

## Component Relationships

```
layout.tsx → CartProvider → all pages
page.tsx (catalog) → SiteHeader, CategoryFilter, ProductCard[], SiteFooter, CartDrawer
product/[id]/page.tsx → ProductDetail (uses shared Product type)
about/contacts/delivery → SiteHeader, shared UI components, SiteFooter
```

## Critical Implementation Paths

- **Hydration fix**: SiteHeader cart badge always renders in DOM, uses CSS `opacity: 0/1` to avoid hydration mismatch
- **JSON import typing**: `src/types/data.d.ts` declares `@/data/products.json` module
- **Category filter**: Derived from unique `product.category` values in products.json
- **Pagination**: `PRODUCTS_PER_PAGE = 8`, client-side slice