import { Check, Sparkles } from "lucide-react";
import { Card, Breadcrumb, SectionHeader } from "@/components/ui";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { SHOP_CONFIG } from "@/lib/config";

const features = [
  "Только проверенные поставщики и бренды",
  "Удобный онлайн-каталог для быстрого заказа",
  "Самовывоз — экономия на доставке",
  "Прозрачные цены без скрытых наценок",
  "Забота о клиенте — наш приоритет",
] as const;

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb links={[{ label: "Каталог", href: "/" }]} current="О нас" />
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <SectionHeader
          title="О нас"
          subtitle={SHOP_CONFIG.description}
        />

        <div className="space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <Card>
            <p>
              {SHOP_CONFIG.name} — это каталог качественных продуктов для тех, кто
              ценит вкус и удобство. Вы выбираете товары на сайте, оформляете
              заказ, а затем забираете его в нашем магазине. Мы тщательно
              отбираем каждый товар в нашем ассортименте, чтобы вы могли
              наслаждаться лучшими продуктами.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Как это работает
            </h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li>Выберите нужные товары в каталоге</li>
              <li>Добавьте их в корзину и оформите заказ</li>
              <li>Приходите в магазин и заберите готовый заказ</li>
            </ol>
          </Card>

          <Card variant="accent">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Почему выбирают нас
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
              Спасибо, что выбираете {SHOP_CONFIG.name}!
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}