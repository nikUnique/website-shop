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
  title: "Cozy Pantry - Semi-Finished Products & Groceries",
  description:
    "Coffee, tea, noodles, pasta and other products for quick and delicious meals. Quality and convenience in every package.",
  openGraph: {
    title: "Cozy Pantry - Semi-Finished Products & Groceries",
    description:
      "Coffee, tea, noodles, pasta and other products for quick and delicious meals. Quality and convenience in every package.",
    type: "website",
    locale: "en_US",
    siteName: "Cozy Pantry",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cozy Pantry - Semi-Finished Products & Groceries",
    description:
      "Coffee, tea, noodles, pasta and other products for quick and delicious meals.",
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
      <head>
        <meta
          name='theme-color'
          content='#111827'
          media='(prefers-color-scheme: dark)'
        />
        <meta
          name='theme-color'
          content='#ffffff'
          media='(prefers-color-scheme: light)'
        />
      </head>
      <body className='min-h-full flex flex-col antialiased bg-[var(--bg-color)] text-[var(--text-color)]'>
        <CartProvider>
          <div className='flex flex-col min-h-full'>{children}</div>
        </CartProvider>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
