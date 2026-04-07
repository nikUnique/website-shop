export const SHOP_CONFIG = {
  name: "Уютная кладовая",
  address: "г. Алматы, ул. Абая 28",
  hours: {
    weekdays: "9:00 – 20:00",
    weekends: "10:00 – 18:00",
    label: "Пн–Пт: 9:00 – 20:00, Сб–Вс: 10:00 – 18:00",
  },
  phone: "+77079575206",
  whatsappNumber: "77079575206",
  email: "info@cozy-pantry.kz",
  description:
    "Полуфабрикаты из свежих продуктов — готовьте дома за минуты без хлопот",
} as const;

export const CART_STORAGE_KEY = "cozy-pantry-cart" as const;
