"use client";

import React from "react";
import { VideoProvider } from "@/context/video-context";
import { RoomContextProvider } from "@/context/room-context";
import { TranslationsProvider } from "@/context/translations-context";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";
import { Header } from "@/components/header";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TranslationsProvider>
        <RoomContextProvider>
          <VideoProvider>
            <ThemeProvider>             
              <Header />
              {children}
            </ThemeProvider>
          </VideoProvider>
        </RoomContextProvider>
      </TranslationsProvider>
    </AuthProvider>
  );
}
