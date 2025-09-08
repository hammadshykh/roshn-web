"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./_components/Header";
import HeroSection from "./_components/HeroSection";
import ScrollImagesSection from "./_components/ScrollImagesSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
 useEffect(() => {
  // Refresh ScrollTrigger on component mount
  ScrollTrigger.refresh();

  // Clean up on unmount
  return () => {
   ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
 }, []);

 return (
  <div className="min-h-screen">
   <Header />
   <main>
    <HeroSection />
    <ScrollImagesSection />
   </main>
  </div>
 );
};

export default Index;
