"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
 const heroRef = useRef<HTMLElement>(null);
 const titleRef = useRef<HTMLHeadingElement>(null);
 const subtitleRef = useRef<HTMLParagraphElement>(null);
 const imageRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const hero = heroRef.current;
  const title = titleRef.current;
  const subtitle = subtitleRef.current;
  const image = imageRef.current;

  if (!hero || !title || !subtitle || !image) return;

  // Initial animation on load
  const tl = gsap.timeline();

  tl
   .from(title, {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "power3.out",
   })
   .from(
    subtitle,
    {
     duration: 1,
     y: 50,
     opacity: 0,
     ease: "power3.out",
    },
    "-=0.8"
   )
   .from(
    image,
    {
     duration: 1.5,
     scale: 1.1,
     opacity: 0,
     ease: "power3.out",
    },
    "-=1"
   );

  // Parallax effect on scroll
  gsap.to(image, {
   yPercent: -50,
   ease: "none",
   scrollTrigger: {
    trigger: hero,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
   },
  });

  // Text fade out on scroll
  gsap.to([title, subtitle], {
   y: -100,
   opacity: 0,
   ease: "power2.out",
   scrollTrigger: {
    trigger: hero,
    start: "top top",
    end: "bottom top",
    scrub: 1,
   },
  });

  return () => {
   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
 }, []);

 return (
  <section
   ref={heroRef}
   className="relative min-h-screen flex items-center diagonal-bg overflow-hidden"
  >
   {/* Background Image */}
   <div
    ref={imageRef}
    className="absolute inset-0 z-0"
    style={{
     clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
    }}
   >
    <img
     src={""}
     alt="Mangrove conservation representing climate solutions"
     className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
   </div>

   {/* Content */}
   <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-2xl">
     <h1
      ref={titleRef}
      className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
     >
      Providing
      <br />
      solutions to
      <br />
      protect our
      <br />
      <span className="text-gradient">planet</span>
     </h1>

     <p
      ref={subtitleRef}
      className="text-xl md:text-2xl text-primary-foreground/90 max-w-xl leading-relaxed"
     >
      Accelerating the path to a Net Zero future by mobilizing the power of
      partnerships, investment, and knowledge.
     </p>
    </div>
   </div>

   {/* Scroll Indicator */}
   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
    <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
     <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse"></div>
    </div>
   </div>
  </section>
 );
};

export default HeroSection;
