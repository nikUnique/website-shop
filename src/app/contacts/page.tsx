import { Breadcrumb, Card, SectionHeader } from "@/components/ui";
import { SHOP_CONFIG } from "@/lib/config";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

interface ContactCard {
  icon: typeof MapPin;
  title: string;
  content: React.ReactNode;
  href?: string;
  color: keyof typeof colorMap;
}

const contactCards: ContactCard[] = [
  {
    icon: MapPin,
    title: "Адрес",
    content: SHOP_CONFIG.address,
    color: "emerald",
  },
  {
    icon: Phone,
    title: "Телефон",
    content: SHOP_CONFIG.phone,
    href: `tel:${SHOP_CONFIG.phone}`,
    color: "blue",
  },
  {
    icon: Mail,
    title: "Email",
    content: SHOP_CONFIG.email,
    href: `mailto:${SHOP_CONFIG.email}`,
    color: "amber",
  },
  {
    icon: Clock,
    title: "Часы работы",
    content: (
      <>
        <p>Пн–Пт: 9:00 – 20:00</p>
        <p>Сб–Вс: 10:00 – 18:00</p>
      </>
    ),
    color: "purple",
  },
];

const colorMap = {
  emerald:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  purple:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
} as const;

export default function ContactsPage() {
  return (
    <div className='flex flex-col min-h-screen bg-zinc-50 dark:bg-black'>
      <SiteHeader />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <Breadcrumb
          links={[{ label: "Каталог", href: "/" }]}
          current='Контакты'
        />
      </div>

      <main className='flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16'>
        <SectionHeader
          title='Контакты'
          subtitle='Свяжитесь с нами любым удобным способом'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {contactCards.map((card) => (
            <Card
              key={card.title}
              className='p-6'
            >
              <div className='flex items-center gap-3 mb-4'>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[card.color]}`}
                >
                  <card.icon className='w-5 h-5' />
                </div>
                <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
                  {card.title}
                </h2>
              </div>
              <div className='text-zinc-600 dark:text-zinc-400'>
                {card.href ? (
                  <a
                    href={card.href}
                    className='hover:text-emerald-600 transition-colors'
                  >
                    {card.content}
                  </a>
                ) : (
                  card.content
                )}
              </div>
            </Card>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
