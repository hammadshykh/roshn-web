"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

const ScrollAnimationComponent = () => {
 const lenisRef = useRef<Lenis | null>(null);
 const workItemsRef = useRef<HTMLDivElement[]>([]);

 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Initialize Lenis smooth scrolling
  lenisRef.current = new Lenis({
   duration: 1.2,
   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenisRef.current.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
   lenisRef.current?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Setup animations
  const setupAnimations = () => {
   workItemsRef.current.forEach((item) => {
    if (!item) return;

    const img = item.querySelector(".work-item-img");
    const nameH1 = item.querySelector(".work-item-name h1");

    if (!img || !nameH1) return;

    // Create split text
    const split = new SplitText(nameH1, {
     type: "chars",
     charsClass: "char",
    });

    gsap.set(split.chars, { y: "125%" });

    split.chars.forEach((char: any, index: number) => {
     ScrollTrigger.create({
      trigger: item,
      start: `top+=${index * 25 - 250} top`,
      end: `top+=${index * 25 - 100} top`,
      scrub: 1,
      animation: gsap.fromTo(char, { y: "125%" }, { y: "0%", ease: "none" }),
     });
    });

    // Image animations
    ScrollTrigger.create({
     trigger: item,
     start: "top bottom",
     end: "top top",
     scrub: 0.5,
     animation: gsap.fromTo(
      img,
      {
       clipPath: "polygon(25% 25%, 75% 40%, 100% 100%, 0% 100%)",
      },
      {
       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
       ease: "none",
      }
     ),
    });

    ScrollTrigger.create({
     trigger: item,
     start: "bottom bottom",
     end: "bottom top",
     scrub: 0.5,
     animation: gsap.fromTo(
      img,
      {
       clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      {
       clipPath: "polygon(0% 0%, 100% 0%, 75% 60%, 25% 75%)",
       ease: "none",
      }
     ),
    });
   });

   ScrollTrigger.refresh();
  };

  // Wait for next tick to ensure DOM is ready
  setTimeout(setupAnimations, 100);

  // Cleanup
  return () => {
   if (lenisRef.current) {
    lenisRef.current.destroy();
   }
   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
 }, []);

 const addToWorkItemsRef = (el: HTMLDivElement | null, index: number) => {
  if (el) {
   workItemsRef.current[index] = el;
  }
 };

 const workItems = [
  { title: "Cardon Edge", image: "/titan-rail.webp" },
  { title: "Velocity Grid", image: "/titan-rail.webp" },
  { title: "Aeroform", image: "/titan-rail.webp" },
  { title: "Mach Horizon", image: "/titan-rail.webp" },
  { title: "Tital Rail", image: "/titan-rail.webp" },
 ];

 return (
  <div className="w-full overflow-hidden">
   {/* Hero Section */}
   <section className="h-screen w-full flex justify-center items-center px-8">
    <h1 className="text-5xl md:text-7xl font-medium uppercase text-center leading-none">
     Beyond the limits
    </h1>
   </section>

   {/* Work Items */}
   {workItems.map((item, index) => (
    <section
     key={index}
     ref={(el: any) => addToWorkItemsRef(el, index)}
     className="work-item h-[150svh] relative w-full overflow-hidden"
    >
     <div className="work-item-img absolute inset-0 w-full h-full">
      <img
       src={item.image}
       alt={item.title}
       className="w-full h-full object-cover"
      />
     </div>
     <div className="work-item-name absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10">
      <h1 className="text-white text-5xl md:text-7xl font-medium uppercase text-center">
       {item.title}
      </h1>
     </div>
    </section>
   ))}

   {/* Outro Section */}
   <section className="h-screen w-full flex justify-center items-center px-8">
    <h1 className="text-5xl md:text-7xl font-medium uppercase text-center leading-none">
     Back to base
    </h1>
   </section>
  </div>
 );
};

export default ScrollAnimationComponent;
