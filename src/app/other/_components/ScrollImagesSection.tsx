"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SlideData {
 title: string;
 subtitle: string;
 description: string;
 image: string;
 imageAlt: string;
 label: string;
}

const ScrollImagesSection = () => {
 const sectionRef = useRef<HTMLDivElement>(null);
 const imageContainerRef = useRef<HTMLDivElement>(null);
 const contentContainerRef = useRef<HTMLDivElement>(null);
 const [activeIndex, setActiveIndex] = useState(0);
 const progressRef = useRef(0);
 const isScrolling = useRef(false);
 const animationRef = useRef<gsap.core.Tween[]>([]);

 const slides: SlideData[] = [
  {
   label: "Core Value",
   title: "Core Value",
   subtitle: "Integrity is at our core",
   description:
    "Our carbon credits meet the highest international standards, ensuring they represent real, measurable reductions in carbon emissions.",
   image:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
   imageAlt:
    "Aerial view of winding forest roads representing integrity and growth",
  },
  {
   label: "Market Focus",
   title: "Market Focus",
   subtitle: "Led from the Global South",
   description:
    "Communities in the Global South are on the frontline of climate change, which is why we are committed to investing in projects in the Middle East, Africa, and beyond.",
   image:
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2560&q=80",
   imageAlt: "African savanna landscape representing the Global South",
  },
  {
   label: "Unified Approach",
   title: "Unified Approach",
   subtitle: "Everyone must play their part",
   description:
    "Just as nations have set ambitious climate targets, so must every business. The voluntary carbon market is a powerful tool for decarbonization.",
   image:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
   imageAlt: "Mountain landscape representing unity and ambition",
  },
 ];

 useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  // Calculate the total scroll distance based on number of slides
  const totalScrollDistance = slides.length * window.innerHeight;

  // Create the pinned scroll animation
  const trigger = ScrollTrigger.create({
   trigger: section,
   start: "top top",
   end: `+=${totalScrollDistance}`,
   scrub: 0.8, // Smoother scrubbing
   pin: true,
   onUpdate: (self) => {
    if (isScrolling.current) return;

    progressRef.current = self.progress;
    const slideIndex = Math.floor(self.progress * slides.length);
    const clampedIndex = Math.min(slideIndex, slides.length - 1);

    if (clampedIndex !== activeIndex) {
     isScrolling.current = true;
     setActiveIndex(clampedIndex);

     // Reset the scrolling flag after a short delay
     setTimeout(() => {
      isScrolling.current = false;
     }, 300);
    }
   },
   onEnterBack: () => {
    // Handle reverse scrolling
    const slideIndex = Math.floor(progressRef.current * slides.length);
    const clampedIndex = Math.min(slideIndex, slides.length - 1);
    if (clampedIndex !== activeIndex) {
     setActiveIndex(clampedIndex);
    }
   },
  });

  return () => {
   trigger.kill();
  };
 }, [activeIndex, slides.length]);

 // Add Y-axis slide animation for images
 useEffect(() => {
  const imageContainer = imageContainerRef.current;
  const contentContainer = contentContainerRef.current;

  if (!imageContainer || !contentContainer) return;

  // Clear any previous animations
  animationRef.current.forEach((anim) => anim.kill());
  animationRef.current = [];

  const images = imageContainer.querySelectorAll(".slide-image");
  const contents = contentContainer.querySelectorAll(".slide-content");

  // Set initial positions for all images
  images.forEach((img, index) => {
   if (index === activeIndex) {
    // Active image slides up from bottom to top
    const anim = gsap.fromTo(
     img,
     { y: "100%", opacity: 1, zIndex: 20 },
     { y: "0%", duration: 1.5, ease: "power2.out" }
    );
    animationRef.current.push(anim);
   } else if (index === 0) {
    // First image stays fixed at the top with reduced opacity
    const anim = gsap.to(img, {
     y: "0%",
     opacity: 0.3, // Reduced opacity instead of hiding
     duration: 1.2,
     zIndex: 5, // Lower z-index but still visible
     ease: "power2.inOut",
    });
    animationRef.current.push(anim);
   } else if (index < activeIndex && index !== 0) {
    // Other previous images move to top and stay there
    const anim = gsap.to(img, {
     y: "-100%",
     opacity: 0,
     duration: 1.2,
     zIndex: 0,
     ease: "power2.inOut",
    });
    animationRef.current.push(anim);
   } else {
    // Future images stay at bottom (hidden)
    const anim = gsap.to(img, {
     y: "100%",
     opacity: 1,
     zIndex: 10,
     immediateRender: false,
    });
    animationRef.current.push(anim);
   }
  });

  // Animate active content
  if (contents[activeIndex]) {
   const anim = gsap.fromTo(
    contents[activeIndex],
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
   );
   animationRef.current.push(anim);
  }

  // Hide non-active content
  contents.forEach((content, index) => {
   if (index !== activeIndex) {
    const anim = gsap.to(content, {
     opacity: 0,
     duration: 0.8,
     y: -20,
    });
    animationRef.current.push(anim);
   }
  });
 }, [activeIndex]);

 return (
  <section
   ref={sectionRef}
   className="h-screen bg-[#ecf8e8] text-primary-foreground overflow-hidden relative"
  >
   <div className="container mx-auto px-6 h-full grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
    {/* Image Container */}
    <div
     className="relative h-[600px] w-[600px] ms-auto overflow-hidden"
     ref={imageContainerRef}
    >
     {slides.map((slide, index) => (
      <div
       key={index}
       className="slide-image absolute top-0 left-0 w-full h-full"
       style={{
        transform: index === 0 ? "translateY(0%)" : "translateY(100%)",
        zIndex: index === 0 ? 5 : 10,
        opacity: index === 0 ? 0.3 : 1,
       }}
      >
       <div className="relative overflow-hidden rounded-2xl shadow-primary h-full">
        <img
         src={slide.image}
         alt={slide.imageAlt}
         className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
       </div>
      </div>
     ))}
    </div>

    {/* Content Container */}
    <div className="relative h-[400px]" ref={contentContainerRef}>
     {slides.map((slide, index) => (
      <div
       key={index}
       className="slide-content absolute top-0 left-0 w-full h-full"
       style={{ opacity: index === 0 ? 1 : 0 }}
      >
       <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-extrabold lg:text-7xl text-[#004853]">
         {slide.title}
        </h2>
        <h3 className="text-4xl md:text-4xl font-bold text-[#004853] leading-tight">
         {slide.subtitle}
        </h3>
        <p className="text-lg text-[#004853] font-semibold leading-relaxed max-w-lg">
         {slide.description}
        </p>
       </div>
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};

export default ScrollImagesSection;
