// context/RoomContext.tsx

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { roomData, Room as RoomType } from "@/db/data"; // 👈 IMPORT THE COMPLETE ROOM INTERFACE

// 1. REMOVE the incomplete local 'interface Room {}' definition here.
//    We now use RoomType imported from "@/db/data".

// 2. Define the interface for the context value that will be shared (RoomContextType)
export interface RoomContextType {
  rooms: RoomType[]; // 👈 USE THE IMPORTED, COMPLETE TYPE
  loading: boolean;
  adults: string;
  setAdults: React.Dispatch<React.SetStateAction<string>>;
  kids: string;
  setKids: React.Dispatch<React.SetStateAction<string>>;
  handleCheck: (e: React.FormEvent) => void;
  resetRoomFilterData: () => void;
}

// 3. Create the Context with an initial value of 'undefined'
const RoomInfo = createContext<RoomContextType | undefined>(undefined);


// 4. Define the props for the Context Provider
interface RoomContextProviderProps {
  children: ReactNode;
}


// 5. Context Provider Component
export const RoomContext: React.FC<RoomContextProviderProps> = ({ children }) => {

  // The data source (roomData) is also cast to the correct type: RoomType[]
  const [rooms, setRooms] = useState<RoomType[]>(roomData as RoomType[]);
  const [loading, setLoading] = useState<boolean>(false);

  // States for user selection
  const [adults, setAdults] = useState<string>('1 Adult');
  const [kids, setKids] = useState<string>('0 Kid');
  const [total, setTotal] = useState<number>(0);


  // Effect to calculate total persons
  useEffect(() => {
    const adultCount = parseInt(adults.split(' ')[0]) || 0;
    const kidsCount = parseInt(kids.split(' ')[0]) || 0;
    setTotal(adultCount + kidsCount);
  }, [adults, kids]);


  // Reset filter data
  const resetRoomFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRooms(roomData as RoomType[])
  };


  // Handle "Check Now" button click
  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // filter rooms based on total persons (using the calculated 'total')
    const filterRooms = (roomData as RoomType[]).filter(room => total <= room.maxPerson)

    setTimeout(() => {
      setLoading(false);
      setRooms(filterRooms);
    }, 3000);
  }


  const shareWithChildren: RoomContextType = {
    rooms, 
    loading,
    adults, 
    setAdults,
    kids, 
    setKids,
    handleCheck,
    resetRoomFilterData,
  };


  return (
    <RoomInfo.Provider value={shareWithChildren}>
      {children}
    </RoomInfo.Provider>
  )
}


// 6. Custom Hook to consume the context
export const useRoomContext = () => {
  const context = useContext(RoomInfo);
  if (context === undefined) {
    throw new Error('useRoomContext must be used within a RoomContext');
  }
  return context;
};