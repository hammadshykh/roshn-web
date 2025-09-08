"use client";

import { ArrowRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { gsap } from "gsap";
import Image from "next/image";

const LatestUpdatesSection = () => {
 return (
  <section className="md:pt-20 pt-10 min-h-screen">
   <div className="max-w-[1440px] ms-auto ">
    <h2 className="text-xl font-[400] uppercase">What’s New</h2>
    <div className=" max-w-3xl ms-auto pe-10">
     <div className="mb-12 flex justify-between">
      <h1 className="text-6xl flex justify-center items-center font-[300]">
       Latest Updates
       <br /> from ROSHN
      </h1>
      <div className="flex items-center gap-1">
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
    </div>

    <div className="flex justify-between min-h-[75vh]">
     {/* Left Content */}
     <div className="w-2/5 mt-auto mb-20 h-auto pr-10">
      <div className="max-w-sm mt-auto h-auto">
       <p className="mb-4">Sep 01, 2025</p>
       <h1 className="text-4xl mb-6">
        ROSHN Group Announces ALAROUS Limited Release Near MARAFY Water Canal
       </h1>
       <p className="text-gray-500 mb-8"></p>
       <div className="w-[300px] h-[200px] relative ">
        <Image
         src={"/latest-update-left-image.webp"}
         fill
         alt="ROSHN Group"
         className="object-cover absolute inset-0"
        />
        <Button
         size={"lg"}
         className="bg-secondary absolute z-40 hover:bg-secondary/90 px-10 text-base font-normal py-5 rounded-full transition-all duration-300 hover:translate-x-2"
        >
         Next
        </Button>
       </div>
      </div>
     </div>

     {/* Right Content */}
     <div className="w-full pl-10">
      {/* Tab Boxes */}
      <div className="relative w-auto h-[70vh]">
       <Image
        src={"/latest-update-right-image.webp"}
        alt="xyz"
        fill
        className="absolute inset-0"
       />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default LatestUpdatesSection;
