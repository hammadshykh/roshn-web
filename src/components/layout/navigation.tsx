"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const navigationMenuTriggerStyle =
 "group inline-flex h-9 w-max items-center hover:text-white/80 font-normal !text-base text-white justify-center rounded-md bg-transparent hover:bg-transparent focus:bg-transparent disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1";

interface DropdownItemProps {
 label: string;
 items: { title: string; href: string }[];
}

function DropdownItem({ label, items }: DropdownItemProps) {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const overlayRef = useRef<HTMLDivElement>(null);
 const timeoutRef = useRef<any | null>(null);
 const dropdownContainerRef = useRef<HTMLDivElement>(null);

 const openDropdown = () => {
  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
   timeoutRef.current = null;
  }
  setIsOpen(true);
 };

 const closeDropdown = () => {
  timeoutRef.current = setTimeout(() => {
   setIsOpen(false);
  }, 150); // Reduced delay for better UX
 };

 const keepDropdownOpen = () => {
  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
   timeoutRef.current = null;
  }
 };

 useEffect(() => {
  if (isOpen) {
   document.body.style.overflow = "hidden";

   // Fixed backdrop filter animation
   gsap.to(overlayRef.current, {
    autoAlpha: 1,
    duration: 0.4,
    ease: "power2.out",
   });

   gsap.fromTo(
    dropdownRef.current,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
   );
  } else {
   document.body.style.overflow = "unset";

   gsap.to(overlayRef.current, {
    autoAlpha: 0,
    duration: 0.3,
    ease: "power2.out",
   });

   gsap.to(dropdownRef.current, {
    autoAlpha: 0,
    duration: 0.3,
    ease: "power2.in",
   });
  }

  return () => {
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
   }
  };
 }, [isOpen]);

 const handleCloseDropdown = () => {
  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
  }
  setIsOpen(false);
 };

 return (
  <div
   className="overflow-hidden"
   ref={dropdownContainerRef}
   onMouseEnter={openDropdown}
   onMouseLeave={closeDropdown}
  >
   <button
    className={cn(navigationMenuTriggerStyle, "flex items-center gap-2 px-2")}
    aria-expanded={isOpen}
   >
    {label}
    <ChevronDown
     size={16}
     className={cn(
      "transition-transform duration-300",
      isOpen ? "rotate-180" : "rotate-0"
     )}
    />
   </button>

   {/* Fixed Full-screen dropdown - BEHIND header */}
   <div
    ref={dropdownRef}
    className={cn(
     "fixed -top-10 -left-20 w-[99vw] h-[80vh] bg-transparent z-[-50] opacity-0 pointer-events-none",
     isOpen && "pointer-events-auto"
    )}
    onMouseEnter={keepDropdownOpen}
    onMouseLeave={closeDropdown}
   >
    {/* Fixed backdrop with proper blur */}
    <div
     ref={overlayRef}
     className="absolute inset-0 z-[-20] bg-black/70 backdrop-blur-md o pointer-events-none supports-backdrop-blur:bg-background/90 w-full"
     onClick={handleCloseDropdown}
    />
    {/* Content container */}
    <div className="container mx-auto pt-48 px-4 relative z-[51]">
     <div className="flex items-start gap-8 w-full">
      {/* Left content */}
      <div className="w-md space-y-6 p-5 text-white">
       <h1 className="text-4xl font-light">{label}</h1>
       <p className="text-gray-200 leading-relaxed">
        {label === "We Are ROSHN" &&
         "ROSHN Group is Saudi Arabia's leading multi-asset class real estate developer and a Public Investment Fund (PIF) company, serving as a key enabler of Saudi Vision 2030. ROSHN is transforming the urban landscape with human-centric, integrated developments that elevate connectivity and enhance the quality of life across the Kingdom."}
        {label === "Communities" &&
         "ROSHN's communities are designed to elevate the quality of life for residents through integrated, human-centric developments. Each community offers modern amenities, green spaces, and sustainable living environments that reflect the highest standards of urban planning and architectural excellence."}
        {label === "By ROSHN Group" &&
         "ROSHN Group extends its expertise beyond residential developments through specialized subsidiaries and projects that contribute to Saudi Arabia's urban transformation, including innovative digital solutions, sports infrastructure, and commercial developments."}
       </p>
       <div className="mt-10">
        <Button
         size="lg"
         variant="secondary"
         className="bg-transparent hover:bg-white/10 border border-white/20 text-white px-10 py-7 rounded-full"
        >
         LEARN MORE
        </Button>
       </div>
      </div>

      {/* Right navigation links */}
      <div className="flex flex-col border-l border-gray-400 px-6 h-[400px] overflow-hidden">
       {items.map((item) => (
        <a
         key={item.title}
         href={item.href}
         className="text-gray-300 text-2xl hover:text-assess-green-lights block py-3 px-4 font-light rounded-lg hover:bg-white/5 transition-all duration-300"
         onClick={handleCloseDropdown}
        >
         {item.title}
        </a>
       ))}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export function HeaderNavigationMenu() {
 const navContainerRef = useRef<HTMLDivElement>(null);

 // Non-dropdown links
 const navItems = [
  { path: "/news", label: "News" },
  { path: "/csr", label: "CSR" },
  { path: "/care", label: "ROSHN Care" },
 ];

 return (
  <div ref={navContainerRef}>
   <div className="flex items-center space-x-0 max-w-5xl">
    {/* Dropdown items */}
    <DropdownItem
     label="We Are ROSHN"
     items={[
      { title: "About", href: "/about" },
      { title: "Mission & Vision", href: "/mission-vision" },
      { title: "Values", href: "/values" },
      { title: "Brand Story", href: "/brand-story" },
      { title: "Leadership", href: "/leadership" },
      { title: "Vision 2030", href: "/vision-2030" },
      { title: "Projects", href: "/projects" },
      { title: "CSR", href: "/csr" },
      { title: "Awards", href: "/awards" },
     ]}
    />

    <DropdownItem
     label="Communities"
     items={[
      { title: "SEDRA", href: "/communities/sedra" },
      { title: "ALAROUS", href: "/communities/alarous" },
      { title: "WAREFA", href: "/communities/warefa" },
      { title: "ALMANAR", href: "/communities/almanar" },
      { title: "ALDANAH", href: "/communities/aldanah" },
      { title: "ALFULWA", href: "/communities/alfulwa" },
     ]}
    />

    <DropdownItem
     label="By ROSHN Group"
     items={[
      { title: "MARAFY", href: "/marafy" },
      { title: "ROSHN Front", href: "/roshn-front" },
      { title: "ROSHN Stadium", href: "/roshn-stadium" },
     ]}
    />

    {/* Simple navigation links */}
    <div className="flex items-center gap-6">
     {navItems.map((item) => (
      <a
       key={item.path}
       href={item.path}
       className={navigationMenuTriggerStyle}
      >
       {item.label}
      </a>
     ))}
    </div>

    <div className="h-5 ms-4">
     <Separator orientation="vertical" className="border-white/30" />
    </div>

    <div className="flex items-center gap-4 ps-5 text-white">
     <Search className="h-4 w-4 hover:text-white/70 cursor-pointer transition-colors" />
     <span className="hover:text-white/70 cursor-pointer transition-colors">
      العربية
     </span>
    </div>

    <div className="h-5 ms-4">
     <Separator orientation="vertical" className="border-white/30" />
    </div>
   </div>
  </div>
 );
}
