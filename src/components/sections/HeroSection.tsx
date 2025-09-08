"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "../layout/header";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Play, Pause } from "lucide-react";
import AnimatedButton from "../custom/AnimatedButton";

export default function HeroSection() {
 const heroRef = useRef<HTMLElement>(null);
 const videoRef = useRef<HTMLVideoElement>(null);
 const [isPlaying, setIsPlaying] = useState(false);

 useGSAP(() => {
  gsap.from(".bottom-cards > div", {
   scale: 0.7,
   opacity: 0,
   duration: 1.3,
   delay: 1,
   ease: "back.out(1.7)",
   stagger: 0.05,
  });
 }, []);

 useEffect(() => {
  const ctx = gsap.context(() => {
   const tl = gsap.timeline();

   tl
    .from(".hero-badge", {
     duration: 0.8,
     y: 30,
     opacity: 0,
     ease: "power3.out",
    })
    .from(
     ".hero-text",
     {
      duration: 1.2,
      y: 100,
      ease: "expo.out",
      stagger: 0.5,
     },
     "-=0.4"
    );
  }, heroRef);

  gsap.to(".hero-bg", {
   backgroundPosition: "50% 100%",
   ease: "none",
   scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: "bottom top",
    scrub: true,
   },
  });

  return () => ctx.revert();
 }, []);

 const handlePlayToggle = () => {
  if (videoRef.current) {
   if (isPlaying) {
    videoRef.current.pause();
    setIsPlaying(false);
   } else {
    videoRef.current.play();
    setIsPlaying(true);
   }
  }
 };

 return (
  <section
   ref={heroRef}
   className="relative md:min-h-screen bg-primary bg-cover bg-center bg-no-repeat pt-4 hero-bg"
  >
   {/* Header Navigation */}
   <Header />

   {/* Hero Content */}
   <div className="relative z-10 pt-20 lg:pt-32 !text-white">
    <div className="max-w-7xl mx-auto md:px-0 px-4 ">
     {/* Description */}
     <div className="text-center">
      <p className="hero-description font-medium  text-gray-300 mb-16 leading-relaxed">
       The National Champion of Destination Real Estate
      </p>

      <div className="hero-text">
       <div className="block text-center font-[300] hero-title lg:text-[120px]  relative">
        Building the Difference
       </div>
      </div>
     </div>
    </div>

    {/* Bottom Cards */}
    <div className="md:px-20 px-4 mt-20 md:mt-32">
     <div className="flex bottom-cards md:grid md:grid-cols-3 items-center gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide">
      {/* Card 1 */}
      <div className="max-w-sm">
       <h2 className="text-2xl md:text-4xl leading-10 !font-normal">
        Shaping Immersive Places, Elevating People, Inspiring Life
       </h2>
       <AnimatedButton />
      </div>

      {/* Card 2 (Logo) */}
      <div className="h-[350px] w-[350px]">
       <Image
        alt=""
        fill
        src={"/hero-logo.webp"}
        className="object-cover fixed translate-x-[15%] transition-transform translate-y-[-30%]"
       />
      </div>

      {/* Card 3 (Video Player) */}
      <div className="w-sm h-[260px] ms-auto relative">
       <div className="group cursor-pointer absolute top-0 left-0 size-full flex flex-col items-start justify-between p-5 text-white max-md-lg:p-2.5 bg-[#02231F]">
        <video
         ref={videoRef}
         className="lazy absolute inset-0 w-[calc(100%-0.8125rem)] h-[calc(100%-0.0625rem)] m-auto object-cover object-center"
         playsInline
         loop
         disablePictureInPicture
         controlsList="nofullscreen"
        >
         <source
          src="https://player.vimeo.com/progressive_redirect/playback/1029235904/rendition/720p/file.mp4?loc=external&signature=3a8a8135414cc530599d0c223629bb319ea16fd9b9c90c4a058c4429934df42b"
          type="video/mp4"
         />
         Your browser does not support the video tag.
        </video>

        <p className="relative uppercase text-sm leading-5 rtl:leading-7 z-20">
         watch
        </p>

        <button
         onClick={handlePlayToggle}
         className="rounded-full w-[3.75rem] h-[3.75rem] bg-white absolute flex justify-center bottom-5 start-5 items-center z-20 transition-all duration-500 max-md-lg:w-[27px] max-md-lg:h-[27px] lg:group-hover:bg-primary"
        >
         {isPlaying ? (
          <Pause className="text-black lg:group-hover:text-white" />
         ) : (
          <Play className="text-black lg:group-hover:text-white" />
         )}
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
