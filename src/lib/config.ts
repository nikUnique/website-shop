export const SHOP_CONFIG = {
  name: "Cozy Pantry",
  address: "International shipping available",
  hours: {
    weekdays: "9:00 – 20:00",
    weekends: "10:00 – 18:00",
    label: "Mon–Fri: 9:00 – 20:00, Sat–Sun: 10:00 – 18:00",
  },
  phone: "+1234567890",
  whatsappNumber: "1234567890",
  email: "hello@cozypantry.com",
  description:
    "Handmade semi-finished products from fresh ingredients — cook at home in minutes without hassle",
} as const;

export const CART_STORAGE_KEY = "cozy-pantry-cart" as const;