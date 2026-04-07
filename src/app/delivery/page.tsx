import { Breadcrumb, Card, SectionHeader, StepItem } from "@/components/ui";
import { SHOP_CONFIG } from "@/lib/config";
import { Clock, Info, MapPin } from "lucide-react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const steps = [
  {
    step: "1",
    title: "Выберите товары",
    description: "Добавьте нужные товары в корзину на нашем сайте",
  },
  {
    step: "2",
    title: "Оформите заказ",
    description:
      "Нажмите «Заказать через WhatsApp» — мы забронируем товары для вас",
  },
  {
    step: "3",
    title: "Получите подтверждение",
    description: "Мы свяжемся с вами для подтверждения готовности заказа",
  },
  {
    step: "4",
    title: "Заберите заказ",
    description: "Приходите в магазин с номером заказа и заберите покупку",
  },
] as const;

const importantInfo = [
  "Заказ хранится в течение 24 часов после подтверждения",
  "При получении необходимо предъявить номер заказа",
  "Оплата производится при получении в магазине",
  "Мы принимаем наличные и банковские карты",
] as const;

export default function DeliveryPage() {
  return (
    <div className='flex flex-col min-h-screen bg-zinc-50 dark:bg-black'>
      <SiteHeader />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <Breadcrumb
          links={[{ label: "Каталог", href: "/" }]}
          current='Самовывоз и получение заказа'
        />
      </div>

      <main className='flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <SectionHeader
          title='Самовывоз и получение заказа'
          subtitle='Оформите заказ на сайте и заберите в магазине'
        />

        <div className='space-y-8'>
          <Card>
            <h2 className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6'>
              Как оформить заказ
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
              Где забрать заказ
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
              Важная информация
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
