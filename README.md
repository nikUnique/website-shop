# 🛒 Local Shop Catalog

A lightweight, static product catalog website for local food shops — built with Next.js and deployed for free on Cloudflare Pages. Customers browse products on their phone and order in one tap via WhatsApp.

---

## The Problem

Small shop owners who sell by phone know the drill — the same questions, over and over, every single day:

> _"What do you have today?" "How much is the...?" "Do you still have...?"_

Every call interrupts work. Every repeated question is time that could be spent elsewhere. And at the end of the day, orders still get mixed up because nothing was written down.

This project reduces that overhead. Customers can browse the full catalog on their own time and see current prices before reaching out — cutting down the back and forth. But it doesn't eliminate phone and WhatsApp communication entirely. The owner still handles every order manually, just with a bit less friction.

---

## What It Does

No apps to install. No accounts to create. No checkout flow. Just a clean product catalog that opens WhatsApp with a pre-filled order message — the way small shop owners already work.

```
Customer browses catalog → taps "Order via WhatsApp"
→ WhatsApp opens: "Order from..."
→ Owner replies, customer picks up
```

---

## Limitations

This is a portfolio/MVP project, not a production-ready business tool. A few honest caveats:

- **No admin interface** — products are hardcoded in `products.json`. The shop owner cannot add, edit, or remove products themselves. Any catalog change requires a developer to edit the file and redeploy.
- **Not a complete solution** — there is no inventory management, no order tracking, no payment handling, and no customer accounts. It is a static catalog with a WhatsApp shortcut, nothing more.
- **Manual order handling** — every order still goes through WhatsApp and is fulfilled manually by the owner.

If you need a fully self-managed solution, the next step would be adding an admin panel with a publish flow via the GitHub API — which was the original plan for this project.

---

## Stack

| Layer    | Technology                             |
| -------- | -------------------------------------- |
| Frontend | Next.js (static export) + Tailwind CSS |
| Products | `products.json` — just a file          |
| Hosting  | Cloudflare Pages                       |
| Cost     | €0/month                               |

---

## Features

- **Category filtering** — dynamic from `products.json`, no config needed
- **WhatsApp button** per product with pre-filled message
- **Mobile first** — large photos and large tap targets
- **Static export** — no server, no database, nothing to break

---

## Getting Started

```bash
git clone https://github.com/nikUnique/website-shop.git
cd shop-catalog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Adding Products

Edit `data/products.json`:

```json
{
  "products": [
    {
      "id": "1",
      "name": "Stuffed Peppers",
      "category": "Ready Meals",
      "price": 6.5,
      "unit": "kg",
      "description": "Homemade, stuffed with rice and minced meat",
      "image": "/images/stuffed-peppers.jpg",
      "available": true
    }
  ]
}
```

Drop product photos into `/public/images/`. That's it. Actually, not, images won't work just like that on Cloudflare. To fix it, follow these instructions: https://commitnobug.com/blog/2025/10-october/how-to-make-nextjs-image-work-on-cloudflare.

---

## Project Structure

```
shop-catalog/
├── data/
│   └── products.json        ← all products live here
├── public/
│   └── images/              ← product photos
└── src/
    ├── app/
    │   ├── page.tsx          ← main catalog page
    │   └── layout.tsx
    └── components/
        ├── ProductCard.tsx
        ├── ProductGrid.tsx
        ├── CategoryFilter.tsx
        └── WhatsAppButton.tsx
```

---

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Connect the repo in [Cloudflare Pages](https://pages.cloudflare.com)
3. Set build command: `npm run build`
4. Set output directory: `out`
5. Add your environment variables in the Cloudflare dashboard (Currently, there is only one for Umami Analytics)
6. Deploy — your site is live

Every push to `master` redeploys automatically.

---

## Built With

Next.js · Tailwind CSS · Cloudflare Pages
