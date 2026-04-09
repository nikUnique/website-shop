"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Clock, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { Breadcrumb } from "@/components/ui";
import type { Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}


export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader showCart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb links={[{ label: "Catalog", href: "/" }]} current={product.name} />
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-8">
          <div className="relative w-full aspect-[4/3]">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">{product.name}</h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">{product.description}</p>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(product.price)}</span>
              <span className="text-lg text-zinc-400 dark:text-zinc-500">per {product.unit}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-white text-lg font-semibold hover:bg-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            <ShoppingCart className="w-6 h-6" />
            Add to cart
          </button>

          <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Quality</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Premium grade</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Shelf life</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Up to 12 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}