"use client";
import Script from 'next/script';
import { Hero } from "@/components/hero";

// 👇 widget base URL based on build-time environment
  const widgetBaseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://voice.strategicmachines.ai'
      : 'https://chaotic.ngrok.io';


export default function Home() {
  return (
    <>
      <Hero />
      {/* 👇 Voice widget script from Voice Platform */}
      <Script
        src={`${widgetBaseUrl}/voice-widget.js`}
        strategy="afterInteractive"
        data-tenant-widget-key="w_cypress_main_7f1b0e9c64f54d1a"
      />
    </>
)}
