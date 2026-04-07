"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    minimumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block"
    >
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-zinc-100">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden bg-zinc-50 aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-zinc-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Price and Unit */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-zinc-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-zinc-400">за {product.unit}</span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              aria-label={`Добавить ${product.name} в корзину`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-500/20 transition-colors duration-300 pointer-events-none" />
      </div>
    </Link>
  );
}
