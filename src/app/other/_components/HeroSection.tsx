"use client";
import { useRef } from "react";

const HeroSection = () => {
 const heroRef = useRef<HTMLElement>(null);

 return (
  <section
   ref={heroRef}
   className="relative min-h-screen flex items-center bg-gradient-to-r from-[#004853] to-[#002029] overflow-hidden"
  >
   {/* Background Image */}
   <div
    className="absolute right-0 top-0 bottom-0 w-1/2 z-0"
    style={{
     clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
    }}
   >
    <img
     src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
     alt="Sustainable environment and climate solutions"
     className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-l from-[#004853]/80 to-transparent"></div>
   </div>

   {/* Content */}
   <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-2xl">
     <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
      Providing
      <br />
      solutions to
      <br />
      protect our
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2FF] to-[#00FFA3]">
       planet
      </span>
     </h1>

     <p className="text-xl md:text-2xl text-white/90 max-w-xl leading-relaxed">
      Accelerating the path to a Net Zero future by mobilizing the power of
      partnerships, investment, and knowledge.
     </p>

     {/* CTA Buttons */}
     <div className="flex gap-4 mt-8">
      <button className="px-8 py-3 bg-[#00C2FF] text-[#004853] font-semibold rounded-full hover:bg-[#00FFA3] transition-colors">
       Our Projects
      </button>
      <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
       Learn More
      </button>
     </div>
    </div>
   </div>
  </section>
 );
};

export default HeroSection;
