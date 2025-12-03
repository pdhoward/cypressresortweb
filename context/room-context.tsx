"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { roomData, Room as RoomType } from "@/db/data";

// Interface for the context value
export interface RoomContextType {
  rooms: RoomType[];
  loading: boolean;
  adults: string;
  setAdults: React.Dispatch<React.SetStateAction<string>>;
  kids: string;
  setKids: React.Dispatch<React.SetStateAction<string>>;
  handleCheck: (e: React.FormEvent) => void;
  resetRoomFilterData: () => void;
}

// Create the context with an initial value of 'undefined'
const RoomInfo = createContext<RoomContextType | undefined>(undefined);

// Props for the Context Provider
interface RoomContextProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const RoomContextProvider: React.FC<RoomContextProviderProps> = ({
  children,
}) => {
  // Base room data
  const [rooms, setRooms] = useState<RoomType[]>(roomData);
  const [loading, setLoading] = useState<boolean>(false);

  // States for user selection
  const [adults, setAdults] = useState<string>("1 Adult");
  const [kids, setKids] = useState<string>("0 Kid");

  // Helper to compute total people from the current strings
  const computeTotalGuests = () => {
    const adultCount = parseInt(adults.split(" ")[0], 10) || 0;
    const kidsCount = parseInt(kids.split(" ")[0], 10) || 0;
    return adultCount + kidsCount;
  };

  // Reset filter data
  const resetRoomFilterData = () => {
    setAdults("1 Adult");
    setKids("0 Kid");
    setRooms(roomData);
  };

  // Handle "Check Now" button click
  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const total = computeTotalGuests();

    // filter rooms based on total persons
    const filteredRooms = roomData.filter(
      (room) => total <= room.maxPerson
    );

    // Simulate async / API delay
    setTimeout(() => {
      setRooms(filteredRooms);
      setLoading(false);
    }, 3000);
  };

  const value: RoomContextType = {
    rooms,
    loading,
    adults,
    setAdults,
    kids,
    setKids,
    handleCheck,
    resetRoomFilterData,
  };

  return <RoomInfo.Provider value={value}>{children}</RoomInfo.Provider>;
};

// Custom Hook to consume the context
export const useRoomContext = (): RoomContextType => {
  const context = useContext(RoomInfo);
  if (context === undefined) {
    throw new Error(
      "useRoomContext must be used within a RoomContextProvider"
    );
  }
  return context;
};
