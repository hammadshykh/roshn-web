"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const navItems = [
  "HOME",
  "ABOUT US",
  "NEWS & MEDIA",
  "CAREERS",
  "INSIGHTS",
  "EXCHANGE PLATFORM",
  "CONTACT US",
  "FAQS",
 ];

 return (
  <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-light/20">
   <div className="container mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
     {/* Logo */}
     <div className="flex items-center">
      <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center mr-3">
       <div className="w-6 h-6 bg-primary rounded-full relative">
        <div className="absolute top-1 left-1 w-1 h-1 bg-primary-foreground rounded-full"></div>
        <div className="absolute top-2 right-1 w-1 h-1 bg-primary-foreground rounded-full"></div>
        <div className="absolute bottom-1 left-2 w-1 h-1 bg-primary-foreground rounded-full"></div>
       </div>
      </div>
      <span className="text-xl font-bold text-primary-foreground">VCM</span>
     </div>

     {/* Desktop Navigation */}
     <nav className="hidden lg:flex items-center space-x-8">
      {navItems.map((item) => (
       <a
        key={item}
        href="#"
        className="text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300 font-medium"
       >
        {item}
       </a>
      ))}
     </nav>

     {/* Language Toggle */}
     <div className="hidden lg:flex items-center space-x-4">
      <Button
       variant="ghost"
       className="text-primary-foreground hover:bg-primary-light/20"
      >
       العربية
      </Button>
     </div>

     {/* Mobile Menu Button */}
     <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="lg:hidden text-primary-foreground p-2"
     >
      <div className="w-6 h-5 flex flex-col justify-between">
       <span
        className={`block h-0.5 bg-current transition-transform duration-300 ${
         isMenuOpen ? "transform rotate-45 translate-y-2" : ""
        }`}
       ></span>
       <span
        className={`block h-0.5 bg-current transition-opacity duration-300 ${
         isMenuOpen ? "opacity-0" : ""
        }`}
       ></span>
       <span
        className={`block h-0.5 bg-current transition-transform duration-300 ${
         isMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
        }`}
       ></span>
      </div>
     </button>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
     <div className="lg:hidden mt-4 pb-4 border-t border-primary-light/20 pt-4">
      <nav className="flex flex-col space-y-4">
       {navItems.map((item) => (
        <a
         key={item}
         href="#"
         className="text-sm text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300 font-medium"
        >
         {item}
        </a>
       ))}
       <Button
        variant="ghost"
        className="text-primary-foreground hover:bg-primary-light/20 self-start"
       >
        العربية
       </Button>
      </nav>
     </div>
    )}
   </div>
  </header>
 );
};

export default Header;
