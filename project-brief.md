Build a Next.js static site for a small local food shop catalog.
Tech stack: Next.js static export, Tailwind CSS, products in /data/products.json,
images in /public/images/, deploy target Cloudflare Pages.
Pages needed:

1. Main catalog page (/) — customer facing
   Main catalog: shop name at top, category filter buttons, product grid with
   photo/name/price/unit/description, WhatsApp order button per product
   (pre-filled message with product name and price), footer with address
   and hours. Mobile first, large photos, large buttons.
   next.config.js: output: 'export', images: unoptimized: true
   Populate products.json with 8 realistic placeholder food products.
   No database, no backend. Everything client-side.
