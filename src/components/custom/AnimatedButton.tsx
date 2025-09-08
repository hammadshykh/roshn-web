"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export default function AnimatedButton() {
 const buttonRef = useRef<HTMLButtonElement>(null);
 const arrowRef = useRef<HTMLDivElement | any | null>(null);
 const containerRef = useRef<HTMLDivElement>(null);

 useGSAP(() => {
  if (!buttonRef.current || !arrowRef.current || !containerRef.current) return;

  // Initial animation setup
  gsap.set(arrowRef.current, { x: 0, opacity: 1 });

  // Hover animation on parent container
  containerRef.current.addEventListener("mouseenter", () => {
   // Move arrow to the right side of button
   gsap.to(arrowRef.current, {
    x: buttonRef.current!.offsetWidth + 4, // Move to right side of button + small gap
    duration: 0.6,
    ease: "power2.out",
    zIndex: -10,
   });

   // Move button to the left to make space for arrow
   gsap.to(buttonRef.current, {
    x: -arrowRef.current?.offsetWidth - 4, // Move left by arrow width + gap
    duration: 0.6,
    ease: "power2.out",
   });
  });

  // Mouse leave animation on parent container
  containerRef.current.addEventListener("mouseleave", () => {
   // Return arrow to original position
   gsap.to(arrowRef.current, {
    x: 0,
    duration: 0.6,
    ease: "power2.out",
   });

   // Return button to original position
   gsap.to(buttonRef.current, {
    x: 0,
    duration: 0.6,
    ease: "power2.out",
   });
  });
 });

 return (
  <div
   ref={containerRef}
   className="flex items-center gap-2 mt-10 relative cursor-pointer"
  >
   <div
    ref={arrowRef}
    className="bg-secondary text-white h-14 w-14 rounded-full flex items-center justify-center absolute left-0 z-10"
   >
    <ArrowRight />
   </div>
   <Button
    ref={buttonRef}
    size={"lg"}
    className="bg-secondary  hover:!bg-secondary px-10 py-7 rounded-full relative overflow-hidden group ml-14"
   >
    <span className="relative z-10">LEARN MORE</span>
   </Button>
  </div>
 );
}
