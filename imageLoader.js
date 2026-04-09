"use client";

export default function myImageLoader({ src, width, quality }) {
  return `https://freshgrocery.pages.dev/${src}?w=${width}&q=${quality || 75}`;
}
