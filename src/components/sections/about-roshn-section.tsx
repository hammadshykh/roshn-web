"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

const AboutRoshnSection = () => {
 const leftImageRef = useRef(null);
 const rightImageRef = useRef(null);
 const textContainerRef = useRef(null);
 const containerRef = useRef(null);
 const [animationPlayed, setAnimationPlayed] = useState(false);
 const scrollTriggersRef = useRef<any[]>([]);

 useEffect(() => {
  // Store references to our ScrollTriggers instead of killing all
  scrollTriggersRef.current = [];

  // Set up parallax effects
  const leftImageTrigger = ScrollTrigger.create({
   trigger: containerRef.current,
   start: "top bottom",
   end: "bottom top",
   scrub: true,
   animation: gsap.to(leftImageRef.current, {
    y: -200,
    ease: "none",
   }),
  });
  scrollTriggersRef.current.push(leftImageTrigger);

  const rightImageTrigger = ScrollTrigger.create({
   trigger: containerRef.current,
   start: "top bottom",
   end: "bottom top",
   scrub: true,
   animation: gsap.to(rightImageRef.current, {
    y: -250,
    ease: "none",
   }),
  });
  scrollTriggersRef.current.push(rightImageTrigger);

  const textContainerTrigger = ScrollTrigger.create({
   trigger: containerRef.current,
   start: "top bottom",
   end: "bottom top",
   scrub: true,
   animation: gsap.to(textContainerRef.current, {
    y: -50,
    ease: "none",
   }),
  });
  scrollTriggersRef.current.push(textContainerTrigger);

  // Text animation setup - only animate the individual text lines
  const textLines = gsap.utils.toArray(".text-line");

  // Create a ScrollTrigger for the text animation
  const textAnimationTrigger = ScrollTrigger.create({
   trigger: containerRef.current,
   start: "top 80%",
   onEnter: () => {
    if (!animationPlayed && textLines.length > 0) {
     // Animate each line with a stagger effect
     gsap.to(textLines, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      onComplete: () => {
       setAnimationPlayed(true);
      },
     });
    }
   },
  });
  scrollTriggersRef.current.push(textAnimationTrigger);

  // Cleanup - only kill our own ScrollTriggers
  return () => {
   scrollTriggersRef.current.forEach((trigger) => trigger.kill());
  };
 }, [animationPlayed]);

 return (
  <div
   ref={containerRef}
   className="py-40 bg-[#fafafa] relative overflow-hidden"
  >
   <div className="max-w-[1440px] mx-auto px-4">
    <h2 className="text-xl font-[300]">ABOUT ROSHN</h2>
   </div>

   <section className="flex justify-between relative">
    <div className="lg:h-[90vh] w-[40%] mt-40">
     <img
      ref={leftImageRef}
      src={"/about-section-image-left.webp"}
      className="h-full w-full object-cover"
      alt="ROSHN development"
     />
    </div>

    <div
     ref={textContainerRef}
     className="absolute translate-x-[65%] top-0 z-40"
    >
     <div
      className="line"
      style={{
       display: "block",
       textAlign: "start",
       position: "relative",
      }}
     >
      <div
       className="line-inner"
       style={{
        display: "block",
        textAlign: "start",
        position: "relative",
        translate: "none",
        rotate: "none",
        scale: "none",
        opacity: 1,
        transform: "translate(0px, 0px)",
       }}
      >
       <h1 className="lg:text-[100px] font-[300] leading-[110%] overflow-hidden">
        <div className="text-line opacity-0 translate-y-10">The Leading</div>
        <div className="text-line opacity-0 translate-y-10">Multi-asset</div>
        <div className="text-line opacity-0 translate-y-10">
         Class Real-estate
        </div>
        <div className="text-line opacity-0 translate-y-10">Developer</div>
       </h1>
      </div>
     </div>
    </div>

    <div className="lg:h-[80vh] w-[36%]">
     <img
      ref={rightImageRef}
      src={"/about-section-image-right.webp"}
      className="h-full w-full object-cover"
      alt="ROSHN properties"
     />
     <p className="text-gray-500 mt-4">
      ROSHN Group is a key enabler of Saudi Vision 2030, transforming the urban
      landscape through human-centric integrated developments that elevate
      connectivity and enhance quality of life across the Kingdom.
     </p>
     <div className="flex items-center gap-1 mt-10">
      <div className="bg-secondary h-14 w-14 rounded-full flex items-center justify-center">
       <ArrowRight className="text-white" />
      </div>
      <Button
       size={"lg"}
       className="bg-secondary hover:bg-secondary px-10 text-base font-normal py-7 rounded-full"
      >
       LEARN MORE
      </Button>
     </div>
    </div>
   </section>
  </div>
 );
};

export default AboutRoshnSection;
