"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import { HeaderNavigationMenu } from "./navigation";
import { cn } from "@/lib/utils";

const navLinks = [
 { label: "We Are ROSHN", href: "/" },
 { label: "Communities", href: "/about" },
 { label: "By ROSHN Group", href: "/contact" },
 { label: "News", href: "/services" },
];

const Header = () => {
 const [isOpen, setIsOpen] = useState(false);

 // Refs for mobile sidebar
 const overlayRef = useRef<HTMLDivElement>(null);
 const sidebarRef = useRef<HTMLDivElement>(null);
 const menuRef = useRef<HTMLDivElement>(null);

 // Init hidden state for sidebar + overlay so GSAP can animate in
 useEffect(() => {
  if (overlayRef.current && sidebarRef.current) {
   gsap.set(overlayRef.current, { autoAlpha: 0 });
   gsap.set(sidebarRef.current, { autoAlpha: 0, scale: 0.95 });
  }
 }, []);

 // Sidebar open/close animation (simple fade + scale)
 useEffect(() => {
  if (!overlayRef.current || !sidebarRef.current) return;

  if (isOpen) {
   // lock scroll
   document.body.style.overflow = "hidden";

   gsap.to(overlayRef.current, {
    autoAlpha: 1,
    duration: 0.3,
    ease: "power1.out",
   });

   gsap.to(sidebarRef.current, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.4,
    ease: "power3.out",
   });
   gsap.fromTo(
    menuRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.3 }
   );
  } else {
   // unlock scroll
   document.body.style.overflow = "";

   gsap.to(sidebarRef.current, {
    autoAlpha: 0,
    scale: 0.96,
    duration: 0.3,
    ease: "power2.in",
   });

   gsap.to(overlayRef.current, {
    autoAlpha: 0,
    duration: 0.3,
    ease: "power1.in",
   });
  }
 }, [isOpen]);

 return (
  <>
   {/* Sticky Header (always visible) with higher z-index */}
   <header
    className={cn(
     "supports-backdrop-blur:bg-background/90 sticky top-12 z-[800] w-full bg-background/40 backdrop-blur-sm",
     "bg-assess-green text-white"
    )}
   >
    {/* Added max-w-[1440px] mx-auto only to the header container */}
    <div className="max-w-[1440px] mx-auto px-4 md:px-0 flex items-center justify-between gap-6 md:gap-0 h-[72px]">
     {/* Desktop nav */}
     <div className="backdrop-blur-lg  z-[999999] h-20 bg-white/25 shadow-2xl items-center flex justify-between ps-10 px-4 rounded-full w-full">
      <div className="relative -ms-2">
       <Image src="/logo.svg" alt="Logo" width={180} height={180} />
      </div>
      <nav className="items-center hidden md:flex">
       <HeaderNavigationMenu />
      </nav>
      <Button className="rounded-full bg-[#ebfef7] text-black uppercase text-base font-normal px-8 md:h-12">
       REGISTER INTEREST
      </Button>
      <div className="md:hidden flex items-center gap-3">
       {isOpen ? (
        <button
         className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
         aria-label="Toggle mobile menu"
         aria-expanded={isOpen}
         onClick={() => setIsOpen(false)}
        >
         <X className="w-6 h-6 text-white" />
        </button>
       ) : (
        <button
         className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
         aria-label="Toggle mobile menu"
         aria-expanded={isOpen}
         onClick={() => setIsOpen(true)}
        >
         <Menu className="w-6 h-6 text-white" />
        </button>
       )}
      </div>
     </div>
    </div>
   </header>

   {/* Mobile Sidebar Overlay + Panel (fade+scale) - remains full width */}
   <div
    ref={overlayRef}
    className="fixed inset-0 w-full h-full z-50 md:hidden opacity-0 pointer-events-none"
    onClick={() => setIsOpen(false)}
   >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

    {/* Centered transparent panel */}
    <div
     ref={sidebarRef}
     className="absolute inset-0 flex items-center justify-center p-6"
     onClick={(e) => e.stopPropagation()}
    >
     <div className="w-full mx-4 rounded-2xl p-6">
      <nav ref={menuRef} className="flex flex-col items-center gap-5 py-2">
       {navLinks.map((link) => (
        <Link
         key={link.label}
         href={link.href}
         onClick={() => setIsOpen(false)}
         className="text-white text-lg font-medium hover:text-primary transition-colors"
        >
         {link.label}
        </Link>
       ))}
      </nav>

      <div className="mt-8">
       <Button
        size="lg"
        className="w-full rounded-full bg-primary text-black font-semibold hover:opacity-90"
        onClick={() => setIsOpen(false)}
       >
        Schedule Your Consultation
       </Button>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default Header;
