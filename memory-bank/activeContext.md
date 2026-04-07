# Active Context

## Current Work Focus

The project's major refactoring is complete. The codebase has been elevated to production-grade senior developer standards. All page components use shared UI components, lucide-react icons, and centralized configuration.

## Recent Changes (Completed)

1. Created centralized config (`src/lib/config.ts`) with all shop constants
2. Built shared UI component library (`src/components/ui/`): Card (4 variants), Breadcrumb, SectionHeader, StepItem, ContactItem
3. Created TypeScript `Product` type (`src/types/product.ts`)
4. Added `cn` utility with `clsx` + `tailwind-merge`
5. Refactored ALL pages and components to use shared UI + lucide-react icons
6. Replaced inline SVGs with lucide-react across 8+ files
7. Fixed Next.js/React hydration mismatch in SiteHeader (cart badge uses CSS opacity toggle)
8. Removed unused Favicon component
9. Fixed all import paths (relative → consistent)
10. Production build verified: ✅ 27 pages, 0 errors

## Next Steps

- Verify cart functionality works correctly end-to-end
- Consider adding `loading.tsx` for page transitions
- Add Open Graph meta tags for social sharing

## Active Decisions

- No localStorage loading during SSR — `loadCartFromStorage` guards `typeof window === "undefined"`
- Cart badge in SiteHeader always renders in DOM, visibility controlled via CSS `opacity: 0/1` (never conditionally mounts/unmounts)
