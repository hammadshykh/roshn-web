"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LoadingPage = () => {
 const [isLoading, setIsLoading] = useState(false);
 const [isVisible, setIsVisible] = useState(false);
 const pathname = usePathname();
 const searchParams = useSearchParams();

 useEffect(() => {
  // Show loading when route changes
  setIsLoading(true);
  setIsVisible(true);

  const timer = setTimeout(() => {
   setIsLoading(false);
   // Start fade out animation
   setTimeout(() => setIsVisible(false), 500);
  }, 2000);

  return () => clearTimeout(timer);
 }, [pathname, searchParams]);

 // Also show loading on initial page load
 useEffect(() => {
  setIsLoading(true);
  setIsVisible(true);

  const timer = setTimeout(() => {
   setIsLoading(false);
   // Start fade out animation
   setTimeout(() => setIsVisible(false), 500);
  }, 2000);

  return () => clearTimeout(timer);
 }, []);

 if (!isVisible) return null;

 return (
  <div
   className={cn(
    "fixed inset-0 z-[9999] bg-primary flex items-center justify-center",
    "transition-opacity duration-500 ease-in-out",
    isLoading ? "opacity-100" : "opacity-0"
   )}
  >
   <div
    className={cn(
     "h-[400px] w-[400px] relative",
     "transition-all duration-700 ease-in-out",
     isLoading ? "scale-100 opacity-100" : "scale-110 opacity-0"
    )}
   >
    <Image
     alt="ROSHN Logo"
     src="/roshn-footer-rebrand-logo.svg"
     fill
     className="object-contain"
     priority
    />
   </div>
  </div>
 );
};

export default LoadingPage;
