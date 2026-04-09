import { Check, Sparkles } from "lucide-react";
import { Card, Breadcrumb, SectionHeader } from "@/components/ui";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { SHOP_CONFIG } from "@/lib/config";

const features = [
  "Only verified suppliers and brands",
  "Convenient online catalog for fast ordering",
  "Store pickup - save on delivery costs",
  "Transparent pricing with no hidden fees",
  "Customer care is our priority",
] as const;

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb links={[{ label: "Catalog", href: "/" }]} current="About" />
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SectionHeader
          title="About us"
          subtitle={SHOP_CONFIG.description}
        />

        <div className="space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <Card>
            <p>
              {SHOP_CONFIG.name} is a catalog of quality products for those who
              value taste and convenience. You select items on the website, place
              your order, then pick it up at our store. We carefully select
              every item in our assortment so you can enjoy the best products.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              How it works
            </h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li>Choose products from the catalog</li>
              <li>Add them to cart and place your order</li>
              <li>Come to the store and pick up your ready order</li>
            </ol>
          </Card>

          <Card variant="accent">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Why choose us
            </h2>
            <ul className="space-y-4">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 text-center">
            <p className="text-lg text-emerald-800 dark:text-emerald-200 font-medium">
              Thank you for choosing {SHOP_CONFIG.name}!
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}