"use client";

import productsData from "../../data/products.json";
import { ChevronLeft, ChevronRight, Inbox } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import CartDrawer from "./components/CartDrawer";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

const PRODUCTS_PER_PAGE = 8;

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const all = productsData.map((p: Product) => p.category);
    const unique = [...new Set(all)];
    return ["All", ...unique];
  }, []);

  const activeProducts = useMemo(() => {
    const filtered = productsData.filter((p: Product) => p.active) as Product[];
    if (selectedCategory === "All") return filtered;
    return filtered.filter((p: Product) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(activeProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = activeProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-black">
      <SiteHeader
        showCart
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            Semi-Finished Products & Groceries
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Coffee, tea, noodles, pasta and other products for quick and delicious meals.
            Quality and convenience in every package.
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category: string) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {paginatedProducts.map((product: Product, index: number) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {pages.map((page: number) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                  page === currentPage
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeProducts.length === 0 && (
          <div className="text-center py-16">
            <Inbox
              className="w-16 h-16 mx-auto text-zinc-300 dark:text-zinc-700 mb-4"
              strokeWidth={1}
            />
            <p className="text-zinc-500 dark:text-zinc-400">
              No products found
            </p>
          </div>
        )}
      </main>

      <SiteFooter />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}