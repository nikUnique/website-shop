import { Breadcrumb, Card, SectionHeader, StepItem } from "@/components/ui";
import { SHOP_CONFIG } from "@/lib/config";
import { Clock, Info, MapPin } from "lucide-react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const steps = [
  {
    step: "1",
    title: "Select products",
    description: "Add items you need to your cart on our website",
  },
  {
    step: "2",
    title: "Place your order",
    description:
      "Click «Order via WhatsApp» — we will reserve items for you",
  },
  {
    step: "3",
    title: "Get confirmation",
    description: "We will contact you to confirm your order is ready",
  },
  {
    step: "4",
    title: "Pick up your order",
    description: "Come to the store with your order number and collect your purchase",
  },
] as const;

const importantInfo = [
  "Order is held for 24 hours after confirmation",
  "Order number is required for pickup",
  "Payment is made at the store when picking up",
  "We accept cash and bank cards",
] as const;

export default function DeliveryPage() {
  return (
    <div className='flex flex-col min-h-screen bg-zinc-50 dark:bg-black'>
      <SiteHeader />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <Breadcrumb
          links={[{ label: "Catalog", href: "/" }]}
          current='Store pickup & order collection'
        />
      </div>

      <main className='flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <SectionHeader
          title='Store pickup & order collection'
          subtitle='Place your order online and pick up at the store'
        />

        <div className='space-y-8'>
          <Card>
            <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6'>
              How to place an order
            </h2>
            <div className='space-y-6'>
              {steps.map((s) => (
                <StepItem
                  key={s.step}
                  step={s.step}
                  title={s.title}
                  description={s.description}
                />
              ))}
            </div>
          </Card>

          <Card variant='accent'>
            <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4'>
              Where to pick up your order
            </h2>
            <div className='space-y-3 text-zinc-700 dark:text-zinc-300'>
              <p className='flex items-center gap-3'>
                <MapPin className='w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0' />
                {SHOP_CONFIG.address}
              </p>
              <p className='flex items-center gap-3'>
                <Clock className='w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0' />
                {SHOP_CONFIG.hours.label}
              </p>
            </div>
          </Card>

          <Card variant='warning'>
            <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4'>
              Important information
            </h2>
            <ul className='space-y-3 text-zinc-700 dark:text-zinc-300'>
              {importantInfo.map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3'
                >
                  <Info className='w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
