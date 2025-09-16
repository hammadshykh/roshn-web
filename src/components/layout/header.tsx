"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

// Shared nav trigger style
const navigationMenuTriggerStyle =
 "group inline-flex h-9 w-max items-center hover:text-white/80 font-normal !text-base text-white justify-center rounded-md bg-transparent hover:bg-transparent focus:bg-transparent disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1";

// Dropdown item type
interface DropdownItemProps {
 label: string;
 items: { title: string; href: string }[];
}

function DropdownItem({ label, items }: DropdownItemProps) {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const overlayRef = useRef<HTMLDivElement>(null);
 const timeoutRef = useRef<any | null>(null);

 const openDropdown = () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setIsOpen(true);
 };
 const closeDropdown = () => {
  timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
 };
 const keepOpen = () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
 };

 useEffect(() => {
  if (isOpen) {
   gsap.to(overlayRef.current, {
    autoAlpha: 1,
    duration: 0.4,
    ease: "power2.out",
   });
   gsap.fromTo(
    dropdownRef.current,
    { autoAlpha: 0, y: -20 },
    { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
   );
  } else {
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
   if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
 }, [isOpen]);

 return (
  <div onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
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

   {/* Fullscreen Dropdown */}
   <div
    ref={dropdownRef}
    className={cn(
     "fixed -top-20 -left-20 w-screen h-screen bg-transparent z-[-1] opacity-0 pointer-events-none",
     isOpen && "pointer-events-auto"
    )}
    onMouseEnter={keepOpen}
    onMouseLeave={closeDropdown}
   >
    {/* Backdrop */}
    <div
     ref={overlayRef}
     className="absolute inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
    />

    {/* Dropdown Content */}
    <div className="container max-w-[1440px] mx-auto pt-80 px-6 relative z-10">
     <div className="flex items-start gap-8 w-full text-white">
      {/* Left */}
      <div className="w-[35%] space-y-6">
       <h1 className="text-4xl font-light">{label}</h1>
       <p className="text-gray-200 leading-relaxed">
        {label === "We Are ROSHN" &&
         "ROSHN Group is Saudi Arabia's leading multi-asset class real estate developer..."}
        {label === "Communities" &&
         "ROSHN's communities are designed to elevate quality of life..."}
        {label === "By ROSHN Group" &&
         "ROSHN Group extends its expertise beyond residential developments..."}
       </p>
       <Button
        size="lg"
        variant="secondary"
        className="bg-transparent hover:bg-white/10 border border-white/20 text-white px-10 py-7 rounded-full"
       >
        LEARN MORE
       </Button>
      </div>

      {/* Right */}
      <div className="flex flex-col border-l border-gray-400 px-6 h-[400px] overflow-y-auto">
       {items.map((item) => (
        <a
         key={item.title}
         href={item.href}
         className="text-gray-300 text-2xl hover:text-green-400 block py-3 px-4 font-light rounded-lg hover:bg-white/5 transition-all duration-300"
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

// ================== MAIN HEADER ==================
export default function Header() {
 const [isOpen, setIsOpen] = useState(false);
 const overlayRef = useRef<HTMLDivElement>(null);
 const sidebarRef = useRef<HTMLDivElement>(null);
 const menuRef = useRef<HTMLDivElement>(null);

 // init hidden
 useEffect(() => {
  if (overlayRef.current && sidebarRef.current) {
   gsap.set(overlayRef.current, { autoAlpha: 0 });
   gsap.set(sidebarRef.current, { autoAlpha: 0, scale: 0.95 });
  }
 }, []);

 // animate open/close
 useEffect(() => {
  if (!overlayRef.current || !sidebarRef.current) return;
  if (isOpen) {
   document.body.style.overflow = "hidden";
   gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
   gsap.to(sidebarRef.current, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.4,
    ease: "power3.out",
   });
   gsap.fromTo(
    menuRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1 }
   );
  } else {
   document.body.style.overflow = "";
   gsap.to(sidebarRef.current, { autoAlpha: 0, scale: 0.96, duration: 0.3 });
   gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.3 });
  }
 }, [isOpen]);

 // nav items
 const navItems = [
  { path: "/news", label: "News" },
  { path: "/csr", label: "CSR" },
  { path: "/care", label: "ROSHN Care" },
 ];

 return (
  <>
   {/* Header */}
   <header className="sticky top-12 z-[800] w-full bg-assess-green text-white backdrop-blur-sm">
    <div className="max-w-[1440px] mx-auto px-4 md:px-0 flex items-center justify-between h-[72px]">
     <div className="backdrop-blur-lg z-[200] h-20 bg-white/25 shadow-2xl flex justify-between px-6 rounded-full w-full items-center">
      {/* Logo */}
      <Image src="/logo.svg" alt="Logo" width={180} height={180} />

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6">
       <DropdownItem
        label="We Are ROSHN"
        items={[
         { title: "About", href: "/about" },
         { title: "Mission & Vision", href: "/mission-vision" },
         { title: "Values", href: "/values" },
        ]}
       />
       <DropdownItem
        label="Communities"
        items={[{ title: "SEDRA", href: "/communities/sedra" }]}
       />
       <DropdownItem
        label="By ROSHN Group"
        items={[{ title: "MARAFY", href: "/marafy" }]}
       />
       {navItems.map((item) => (
        <a
         key={item.path}
         href={item.path}
         className={navigationMenuTriggerStyle}
        >
         {item.label}
        </a>
       ))}

       {/* Divider */}
       <Separator orientation="vertical" className="border-white/30 h-5" />
       {/* Search + Lang */}
       <div className="flex items-center gap-4 ps-5">
        <Search className="h-4 w-4 hover:text-white/70 cursor-pointer" />
        <span className="hover:text-white/70 cursor-pointer">العربية</span>
       </div>
      </nav>

      {/* CTA */}
      <Button className="rounded-full bg-[#ebfef7] text-black uppercase px-8 md:h-12">
       REGISTER INTEREST
      </Button>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
       <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
       </button>
      </div>
     </div>
    </div>
   </header>

   {/* Mobile Sidebar */}
   <div
    ref={overlayRef}
    className="fixed inset-0 z-50 md:hidden opacity-0 pointer-events-none"
    onClick={() => setIsOpen(false)}
   >
    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
    <div
     ref={sidebarRef}
     className="absolute inset-0 flex items-center justify-center p-6"
     onClick={(e) => e.stopPropagation()}
    >
     <div className="w-full mx-4 rounded-2xl p-6">
      <nav ref={menuRef} className="flex flex-col items-center gap-5">
       {[
        "We Are ROSHN",
        "Communities",
        "By ROSHN Group",
        "News",
        "CSR",
        "ROSHN Care",
       ].map((label) => (
        <Link
         key={label}
         href="/"
         onClick={() => setIsOpen(false)}
         className="text-white text-lg font-medium hover:text-primary"
        >
         {label}
        </Link>
       ))}
      </nav>
      <div className="mt-8">
       <Button
        size="lg"
        className="w-full rounded-full bg-primary text-black font-semibold"
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
}
