"use client";

import { ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { gsap } from "gsap";

const SelectAreaSection = () => {
 const [activeTab, setActiveTab] = useState("partners");
 const contentRef = useRef<any>(null);
 const titleRef = useRef<any>(null);
 const descRef = useRef<any>(null);
 const buttonRef = useRef<any>(null);
 const imageRef = useRef<any>(null);

 const tabs = [
  {
   id: "partners",
   title: "Partners",
   description:
    "We are looking to partner with local companies to develop best-in-class communities with first-rate amenities that our customers will be proud to call home.",
   buttonText: "LEARN MORE",
   image: "/partners-image.webp",
  },
  {
   id: "homeBuyers",
   title: "Home Buyers",
   description:
    "Discover exceptional homes in master-planned communities designed for modern living, with premium amenities and convenient locations across Saudi Arabia.",
   buttonText: "EXPLORE HOMES",
   image: "/home-buyers-image.webp",
  },
  {
   id: "jobSeekers",
   title: "Job Seekers",
   description:
    "Join our visionary team and contribute to Saudi Arabia's most ambitious real estate projects, with opportunities for growth and professional development.",
   buttonText: "VIEW CAREERS",
   image: "/careers-image.webp",
  },
  {
   id: "subDevelopers",
   title: "Sub-Developers",
   description:
    "Collaborate with us to deliver world-class integrated communities. We seek experienced development partners who share our commitment to excellence.",
   buttonText: "PARTNER WITH US",
   image: "/developers-image.webp",
  },
  {
   id: "csrPartners",
   title: "CSR Partners",
   description:
    "Work with us on meaningful corporate social responsibility initiatives that create positive social impact and support sustainable community development.",
   buttonText: "LEARN MORE",
   image: "/csr-image.webp",
  },
 ];

 const activeContent = tabs.find((tab) => tab.id === activeTab) || tabs[0];

 useEffect(() => {
  // Animate content changes
  gsap.to([titleRef.current, descRef.current, buttonRef.current], {
   opacity: 0,
   y: 20,
   duration: 0.3,
   onComplete: () => {
    // Update content
    if (titleRef.current) titleRef.current.innerText = activeContent.title;
    if (descRef.current) descRef.current.innerText = activeContent.description;
    if (buttonRef.current)
     buttonRef.current.innerText = activeContent.buttonText;

    // Animate back in
    gsap.to([titleRef.current, descRef.current, buttonRef.current], {
     opacity: 1,
     y: 0,
     duration: 0.5,
     stagger: 0.1,
    });
   },
  });

  // Animate image change
  if (imageRef.current) {
   gsap.to(imageRef.current, {
    opacity: 0,
    scale: 1.1,
    duration: 0.4,
    onComplete: () => {
     // In a real implementation, you would change the image source here
     // For now, we'll just animate it back
     gsap.to(imageRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
     });
    },
   });
  }
 }, [activeContent]);

 const handleTabHover = (tabId: any) => {
  setActiveTab(tabId);
 };

 return (
  <section className="md:py-20 py-10 min-h-screen">
   <div className="max-w-[1440px] mx-auto px-4">
    <h2 className="text-xl font-[400] uppercase">CONNECT WITH ROSHN</h2>
    <div className="mb-12">
     <h1 className="text-6xl flex justify-center items-center font-[300]">
      Select Your Area <br /> of Interest
     </h1>
    </div>
    <div className="flex justify-between min-h-[75vh] mt-10">
     {/* Left Content */}
     <div className="w-2/5 mt-auto h-auto pr-10">
      <div className="max-w-md mt-auto h-auto">
       <h1 ref={titleRef} className="text-4xl mb-6">
        {activeContent.title}
       </h1>
       <p ref={descRef} className="text-gray-500 mb-8">
        {activeContent.description}
       </p>
       <div className="flex items-center gap-1">
        <div className="bg-secondary h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
         <ArrowRight className="text-white" />
        </div>
        <Button
         size={"lg"}
         className="bg-secondary hover:bg-secondary/90 px-10 text-base font-normal py-7 rounded-full transition-all duration-300 hover:translate-x-2"
        >
         {activeContent.buttonText}
        </Button>
       </div>
      </div>
     </div>

     {/* Center Image */}
     <div className="w-1/5 flex items-center justify-center flex-col">
      <div
       ref={imageRef}
       className="w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-xl"
      >
       <span className="text-white text-lg font-semibold text-center px-4">
        {activeContent.title}
       </span>
      </div>
     </div>

     {/* Right Content */}
     <div className="w-2/6 pl-10">
      {/* Tab Boxes */}
      <div className="grid grid-cols-2 gap-6">
       {tabs.map((tab) => (
        <div
         key={tab.id}
         className={`p-6 border flex items-start justify-end flex-col h-36 w-full cursor-pointer transition-all duration-300 ease-in-out ${
          activeTab === tab.id
           ? "bg-secondary/10  border-secondary shadow-lg"
           : "bg-white text-gray-800 border-gray-300 hover:border-secondary/70 hover:shadow-md"
         }`}
         onMouseEnter={() => handleTabHover(tab.id)}
         onClick={() => handleTabHover(tab.id)}
        >
         <h3 className="text-xl font-[300] mb-3">{tab.title}</h3>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default SelectAreaSection;
