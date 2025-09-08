import AboutRoshnSection from "@/components/sections/about-roshn-section";
import HeroSection from "@/components/sections/HeroSection";
import ImageSliderSection from "@/components/sections/ImageSliderSection";
import LatestUpdatesSection from "@/components/sections/latest-updates";
import SelectAreaSection from "@/components/sections/select-area-section";

export default function Home() {
 return (
  <div>
   <HeroSection />
   <AboutRoshnSection />
   <ImageSliderSection />
   {/* Add more sections below to ensure there's content to scroll to */}
   <SelectAreaSection />
   <LatestUpdatesSection />
  </div>
 );
}
