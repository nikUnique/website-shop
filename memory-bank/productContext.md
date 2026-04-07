# Product Context

## Why This Project Exists

A small local food shop ("Уютная кладовая") needs an online catalog to showcase their semi-finished products and groceries (coffee, tea, noodles, pasta, etc.). The shop has no orders for online delivery — customers browse the catalog then pick up orders in person.

## Problems It Solves

1. **No digital presence** — The shop previously had no online catalog, relying on word-of-mouth and foot traffic.
2. **Manual ordering friction** — Customers had to call or visit to ask what's available and at what price.
3. **Inventory awareness** — The owner needed a simple way to manage products without a full e-commerce platform.
4. **Cost constraints** — No budget for a database, backend, or third-party e-commerce service.

## How It Works

- **Customers**: Visit the site, browse a mobile-first product grid, filter by categories, view product details, add to cart, and submit orders via WhatsApp (pre-filled message).

## User Experience Goals

- **Mobile-first**: Large photos, large buttons, thumb-friendly navigation.
- **Fast**: Static site generation with no runtime dependencies — instant page loads.
- **Simple**: No login required for customers. Cart is localStorage-based. Ordering is a single WhatsApp click.
- **Dark mode**: System-preference-aware with `next-themes`.