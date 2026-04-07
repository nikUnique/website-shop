"use client"; // Only if needed; actually not required for this Script

import Script from "next/script";

export default function UmamiAnalytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!websiteId) {
    return null;
  }

  return (
    <Script
      async
      src='https://cloud.umami.is/script.js' // Change if self-hosted
      data-website-id={websiteId}
      // Optional extras:
      // data-auto-track="false"   // if you want manual tracking
      // data-do-not-track="true"
    />
  );
}
