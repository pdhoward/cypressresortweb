'use client';

import { cn } from "@/lib/utils";
import { ChevronDown, Menu as MenuIcon } from 'lucide-react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from "@/context/auth-context";
import { useVideo } from "@/context/video-context";
import { AccessGate } from "@/components/security/access-gate";

// Reuse NavLink and GatedNavLink from Header (assume they are exported or shared)
import { NavLink, GatedNavLink } from './header'; // Adjust path if needed

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { showVideo } = useVideo();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("lg:hidden text-foreground hover:text-foreground/70", className)} aria-label="Open mobile menu">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md h-full max-h-[90vh] rounded-t-lg flex flex-col bg-gray-900 text-white border-gray-800 p-0 ">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-800">
          <DialogTitle className="text-xl font-bold text-white">Menu</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:text-white/70"> </Button>
        </DialogHeader>
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="flex flex-col space-y-4">
            <NavLink href="/about" active={false} onClick={() => setIsOpen(false)} showVideo={showVideo}>About</NavLink>
            <NavLink href="/gallery" active={false} showVideo={showVideo}>
              Villas
            </NavLink>
            <NavLink href="/experiences" active={false} onClick={() => setIsOpen(false)} showVideo={showVideo}>Experiences</NavLink>
            <NavLink href="/journey" active={false} onClick={() => setIsOpen(false)} showVideo={showVideo}>The Journey</NavLink>
            <NavLink href="/reservations" active={false} showVideo={showVideo}>
              Your Reservations
            </NavLink> 
            <AccessGate />         
            
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};