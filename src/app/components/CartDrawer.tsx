"use client";

import { SHOP_CONFIG } from "@/lib/config";
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
}

function generateWhatsAppOrderText(
  items: Array<{ name: string; quantity: number; price: number }>,
  totalPrice: number,
): string {
  if (items.length === 0) return "";

  let text = "🛒 *Order from " + SHOP_CONFIG.name + "*\n\n";
  text += "📦 *Order contents:*\n";

  items.forEach((item, index) => {
    text += `${index + 1}. ${item.name} - ${item.quantity} pcs - ${formatPrice(item.price * item.quantity)}\n`;
  });

  text += `\n💰 *Total: ${formatPrice(totalPrice)}*`;
  text += "\n\n📍 Order for store pickup";

  return encodeURIComponent(text);
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    updateQuantity,
    removeFromCart,
    totalCount,
    totalPrice,
    clearCart,
  } = useCart();

  const handleWhatsAppOrder = () => {
    const orderText = generateWhatsAppOrderText(items, totalPrice);
    const whatsappUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${orderText}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    const confirmed = window.confirm(
      `Are you sure you want to clear the cart?\n\n${items.length} item(s) worth ${formatPrice(totalPrice)} will be removed.`,
    );
    if (confirmed) {
      clearCart();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800'>
            <h2 className='text-xl font-bold text-zinc-900 dark:text-zinc-50'>
              Cart ({totalCount})
            </h2>
            <button
              onClick={onClose}
              className='p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors'
              aria-label='Close cart'
            >
              <X className='w-6 h-6' />
            </button>
          </div>

          {/* Cart Items */}
          <div className='flex-1 overflow-y-auto p-6'>
            {items.length === 0 ? (
              <div className='flex flex-col items-center justify-center h-full text-center'>
                <ShoppingBag
                  className='w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4'
                  strokeWidth={1}
                />
                <p className='text-zinc-500 dark:text-zinc-400'>
                  Cart is empty
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl'
                  >
                    <div className='relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className='object-cover'
                        sizes='64px'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate'>
                        {item.name}
                      </h3>
                      <p className='text-sm text-zinc-500 dark:text-zinc-400'>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className='w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors'
                        aria-label='Decrease quantity'
                      >
                        <Minus className='w-4 h-4' />
                      </button>
                      <span className='w-8 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className='w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors'
                        aria-label='Increase quantity'
                      >
                        <Plus className='w-4 h-4' />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='p-2 text-zinc-400 hover:text-red-500 transition-colors'
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className='border-t border-zinc-200 dark:border-zinc-800 p-6'>
              <div className='flex items-center justify-between mb-4'>
                <span className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
                  Total:
                </span>
                <span className='text-2xl font-bold text-zinc-900 dark:text-zinc-50'>
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className='space-y-3'>
                <button
                  onClick={handleWhatsAppOrder}
                  className='w-full py-4 rounded-2xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2'
                  data-umami-event='order-button'
                >
                  <MessageCircle className='w-5 h-5' />
                  Order via WhatsApp
                </button>
                <button
                  onClick={handleClearCart}
                  className='w-full py-4 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg border-2 border-red-700'
                >
                  Clear cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
