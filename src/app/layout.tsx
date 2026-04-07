import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "./context/CartContext";

import UmamiAnalytics from "./components/UmamiAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Уютная кладовая - Полуфабрикаты и Бакалея",
  description:
    "Кофе, чай, лапша, паста и другие продукты для быстрой и вкусной еды. Качество и удобство в каждой упаковке.",
  openGraph: {
    title: "Уютная кладовая - Полуфабрикаты и Бакалея",
    description:
      "Кофе, чай, лапша, паста и другие продукты для быстрой и вкусной еды. Качество и удобство в каждой упаковке.",
    type: "website",
    locale: "ru_KZ",
    siteName: "Уютная кладовая",
  },
  twitter: {
    card: "summary_large_image",
    title: "Уютная кладовая - Полуфабрикаты и Бакалея",
    description:
      "Кофе, чай, лапша, паста и другие продукты для быстрой и вкусной еды.",
  },
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  //   { media: "(prefers-color-scheme: dark)", color: "#111827" },
  // ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col antialiased'>
        <CartProvider>
          <div className='flex flex-col min-h-full'>{children}</div>
        </CartProvider>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
