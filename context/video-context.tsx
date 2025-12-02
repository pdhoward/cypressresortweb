"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type VideoContextValue = {
  showVideo: boolean;
  setShowVideo: (value: boolean) => void;
};

const VideoContext = createContext<VideoContextValue | undefined>(undefined);

type VideoProviderProps = {
  children: ReactNode;
};

export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [showVideo, setShowVideo] = useState(false);

  // Global trigger: fade into video after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <VideoContext.Provider value={{ showVideo, setShowVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextValue => {
  const ctx = useContext(VideoContext);
  if (!ctx) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return ctx;
};
