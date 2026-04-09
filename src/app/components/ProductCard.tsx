"use client";

import type { Product } from "@/types/product";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
      className='block product-card'
    >
      <div className='group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-transform duration-300 overflow-hidden border border-zinc-100'>
        {/* Image Container */}
        <div className='relative w-full overflow-hidden bg-zinc-50 aspect-square'>
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes='(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            className='object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform'
          />

          {/* Category Badge */}
          <div className='absolute top-2 left-2 sm:top-3 sm:left-3'>
            <span className='inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-zinc-700 shadow-sm'>
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className='p-3 sm:p-5'>
          <h3 className='text-sm sm:text-lg font-semibold text-zinc-900 mb-1 sm:mb-2 line-clamp-1 sm:line-clamp-2 group-hover:text-emerald-600 transition-colors'>
            {product.name}
          </h3>

          <p className='text-[11px] sm:text-sm text-zinc-500 mb-2 sm:mb-4 line-clamp-1 sm:line-clamp-2'>
            {product.description}
          </p>

          {/* Price and Unit */}
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <span className='text-sm sm:text-xl font-bold text-zinc-900'>
                {formatPrice(product.price)}
              </span>
              <span className='text-[10px] sm:text-xs text-zinc-400'>
                per {product.unit}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className='inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200 shadow-lg hover:shadow-xl'
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className='w-4 h-4 sm:w-5 sm:h-5' />
            </button>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div
          className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-500/20 transition-colors duration-300 pointer-events-none'
          style={{ contentVisibility: "auto" }}
        />
      </div>
    </Link>
  );
}
