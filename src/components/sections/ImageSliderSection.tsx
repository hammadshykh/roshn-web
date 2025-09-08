"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
 gsap.registerPlugin(ScrollTrigger);
}

const ImageSliderSection = () => {
 const sectionRef = useRef(null);
 const pinRef = useRef(null);
 const imagesRef = useRef<any>([]);
 const contentRef = useRef<any>([]);
 const progressBarRef = useRef(null);
 const [activeIndex, setActiveIndex] = useState(0);

 // Sample data for slides
 const slides = [
  {
   image: "/slide-image-1.webp",
   title: "ALMANAR",
   description:
    "ALMANAR is designed on a human scale and grouped into separate neighborhoods, encouraging friendly interactions with neighbors and a peaceful ambiance.",
  },
  {
   image: "/slide-image-2.webp",
   title: "SEDRA",
   description:
    "SEDRA is designed to enhance the well-being of you and your family, offering a healthy lifestyle along with market-leading community services.",
  },
  {
   image: "/slide-image-3.webp",
   title: "ALAROUSE",
   description:
    "ROSHN Group is delighted to introduce its first community in the Western Region, ALAROUS, within minutes of the Red Sea coast.",
  },
 ];

 useEffect(() => {
  // Ensure all refs are populated
  if (
   imagesRef.current.length !== slides.length ||
   contentRef.current.length !== slides.length
  ) {
   return;
  }

  const ctx = gsap.context(() => {
   // Set initial states for images - Y-axis animation
   gsap.set(imagesRef.current, { y: "100%", opacity: 0 });
   gsap.set(imagesRef.current[0], { y: "0%", opacity: 1 });

   // Set initial states for content - No animation, just show/hide
   gsap.set(contentRef.current, { opacity: 0 });
   gsap.set(contentRef.current[0], { opacity: 1 });

   // Create the pinning and animation timeline
   const tl = gsap.timeline({
    scrollTrigger: {
     trigger: sectionRef.current,
     start: "top top",
     end: "+=300%",
     scrub: true,
     pin: true,
     anticipatePin: 1,
     onUpdate: (self) => {
      const progress = self.progress * slides.length;
      const index = Math.min(Math.floor(progress), slides.length - 1);
      setActiveIndex(index);

      // Update progress bar
      const segmentProgress = progress - index;
      const progressHeight =
       (index / (slides.length - 1) + segmentProgress / (slides.length - 1)) *
       100;
      gsap.to(progressBarRef.current, {
       height: `${progressHeight}%`,
       duration: 0.1,
      });
     },
    },
   });

   // Animation for each slide transition - Only for images
   for (let i = 0; i < slides.length - 1; i++) {
    const position = i / (slides.length - 1);

    // Hide current image with Y-axis animation
    tl.to(
     imagesRef.current[i],
     {
      y: "-100%",
      opacity: 0,
      duration: 0.8,
     },
     position
    );

    // Show next image with Y-axis animation (slides up from bottom)
    tl.to(
     imagesRef.current[i + 1],
     {
      y: "0%",
      opacity: 1,
      duration: 0.8,
     },
     position
    );

    // Hide current content - No animation, just opacity
    tl.to(
     contentRef.current[i],
     {
      opacity: 0,
      duration: 0.1,
     },
     position
    );

    // Show next content - No animation, just opacity
    tl.to(
     contentRef.current[i + 1],
     {
      opacity: 1,
      duration: 0.1,
     },
     position
    );
   }
  }, sectionRef);

  return () => ctx.revert();
 }, [slides.length]);

 const addToImagesRef = (el: any, index: number) => {
  imagesRef.current[index] = el;
 };

 const addToContentRef = (el: any, index: any) => {
  contentRef.current[index] = el;
 };

 return (
  <section ref={sectionRef} className="relative overflow-hidden">
   <div ref={pinRef} className="h-screen w-screen">
    {/* Background images for each slide */}
    {slides.map((slide, index) => (
     <div
      key={index}
      ref={(el) => addToImagesRef(el, index)}
      className="absolute inset-0 w-screen h-full"
     >
      <div
       className="absolute inset-0 w-full h-full"
       style={{ backgroundColor: `rgba(0, 0, 0, ${0.3 + index * 0.1})` }}
      ></div>
      <img
       src={slide.image}
       alt={slide.title}
       className="w-screen h-full object-cover"
      />
     </div>
    ))}

    {/* Content overlay */}
    <div className="absolute inset-0 flex items-center justify-center z-10">
     <div className="max-w-4xl mx-auto px-6 text-center text-white w-full">
      {slides.map((slide, index) => (
       <div
        key={index}
        ref={(el) => addToContentRef(el, index)}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 opacity-0 w-full"
       >
        <h2 className="text-5xl md:text-7xl font-light mb-6">{slide.title}</h2>
        <p className="text-xl md:text-2xl max-w-2xl font-extralight">
         {slide.description}
        </p>
       </div>
      ))}
     </div>
    </div>

    {/* Vertical progress bar */}
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 h-64 w-1 bg-white/20 rounded-full z-20">
     <div
      ref={progressBarRef}
      className="absolute top-0 left-0 w-full h-0 bg-white rounded-full origin-top"
     ></div>

     {/* Progress indicators */}
     {slides.map((slide, index) => (
      <div
       key={index}
       className={`absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${
        index === activeIndex ? "bg-white" : "bg-white/50"
       }`}
       style={{ top: `${(index / (slides.length - 1)) * 100}%` }}
      >
       <div className="absolute right-full mr-4 whitespace-nowrap text-white text-sm">
        {slide.title}
       </div>
      </div>
     ))}
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center">
     <span className="text-sm mb-2">Scroll to explore</span>
     <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
      <div className="w-1 h-3 bg-white mt-2 rounded-full animate-bounce"></div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default ImageSliderSection;
