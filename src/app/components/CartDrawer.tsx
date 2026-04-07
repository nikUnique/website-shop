"use client";

import Image from "next/image";
import { Minus, Plus, X, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { SHOP_CONFIG } from "@/lib/config";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    minimumFractionDigits: 0,
  }).format(price);
}

function generateWhatsAppOrderText(
  items: Array<{ name: string; quantity: number; price: number }>,
  totalPrice: number,
): string {
  if (items.length === 0) return "";

  let text = "🛒 *Заказ с сайта " + SHOP_CONFIG.name + "*\n\n";
  text += "📦 *Состав заказа:*\n";

  items.forEach((item, index) => {
    text += `${index + 1}. ${item.name} - ${item.quantity} шт. - ${formatPrice(item.price * item.quantity)}\n`;
  });

  text += `\n💰 *Итого: ${formatPrice(totalPrice)}*`;
  text += "\n\n📍 Заказ для самовывоза из магазина";

  return encodeURIComponent(text);
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, totalCount, totalPrice, clearCart } = useCart();

  const handleWhatsAppOrder = () => {
    const orderText = generateWhatsAppOrderText(items, totalPrice);
    const whatsappUrl = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${orderText}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    const confirmed = window.confirm(
      `Вы уверены, что хотите очистить корзину?\n\nБудет удалено ${items.length} товар(ов) на сумму ${formatPrice(totalPrice)}.`,
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
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Корзина ({totalCount})
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              aria-label="Закрыть корзину"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-700 mb-4" strokeWidth={1} />
                <p className="text-zinc-500 dark:text-zinc-400">Корзина пуста</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        aria-label="Уменьшить количество"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                        aria-label="Увеличить количество"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                      aria-label={`Удалить ${item.name}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Итого:</span>
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 rounded-2xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Заказать через WhatsApp
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full py-4 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg border-2 border-red-700"
                >
                  Очистить корзину
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}