import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { VideoProvider } from "@/context/video-context";
import { RoomContextProvider } from "@/context/room-context";
import {TranslationsProvider} from "@/context/translations-context";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cypress Resort | Home",
  description: "Luxury resort in the North Geogia Mountains",
  generator: 'Strategic Machines',
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
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <TranslationsProvider>
          <RoomContextProvider>
            <VideoProvider >        
              <Header />
              {children}
            </VideoProvider>
          </RoomContextProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
