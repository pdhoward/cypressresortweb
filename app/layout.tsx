import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";

import "./globals.css";
import { AppProviders } from "./providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cypress Resort | Home",
  description: "Luxury resort in the North Geogia Mountains",
  generator: "Strategic Machines",
  keywords:
    "CypressResort, Luxury Villas, Georgia, North Georgia Mountains, Atlanta, Micro Resort, Luxury Resort, Waterfall, Nature",
  openGraph: {
    title: "Cypress Resort | Luxury & Nature",
    siteName: "Cypress Resort",
    url: "https://www.cypressresort.com",
    images: [
      {
        url: "https://res.cloudinary.com/stratmachine/image/upload/v1764609117/cypress/cypresslogocircle_a0havb.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased bg-background text-foreground`}>
        <AppProviders>
          {children}
          <CookieConsent />
        </AppProviders>
      </body>
    </html>
  );
}
