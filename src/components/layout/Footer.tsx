import React from "react";
import { Separator } from "../ui/separator";
import AnimatedButton from "../custom/AnimatedButton";

// Reusable Link Component
const FooterLink = ({
 href,
 children,
}: {
 href: string;
 children: React.ReactNode;
}) => (
 <a
  href={href}
  className="block text-gray-800 hover:text-primary transition-colors"
 >
  {children}
 </a>
);

// Reusable Section Component
const FooterSection = ({
 title,
 links,
}: {
 title: string;
 links: { href: string; label: string }[];
}) => (
 <div className="space-y-6">
  <h3 className="text-lg text-secondary mb-6">{title}</h3>
  <div className="space-y-3">
   {links.map((link) => (
    <FooterLink key={link.href} href={link.href}>
     {link.label}
    </FooterLink>
   ))}
  </div>
 </div>
);

// Social Media Icons Component
const SocialIcons = () => {
 const socialLinks = [
  {
   href: "#",
   icon: (
    <svg
     width="16"
     height="16"
     viewBox="0 0 24 24"
     className="text-secondary hover:text-primary"
    >
     <path
      fill="currentColor"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
     />
    </svg>
   ),
  },
  {
   href: "#",
   icon: (
    <svg
     width="16"
     height="16"
     viewBox="0 0 24 24"
     className="text-secondary hover:text-primary"
    >
     <path
      fill="currentColor"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
     />
    </svg>
   ),
  },
  {
   href: "#",
   icon: (
    <svg
     width="16"
     height="16"
     viewBox="0 0 24 24"
     className="text-secondary hover:text-primary"
    >
     <path
      fill="currentColor"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
     />
    </svg>
   ),
  },
 ];

 return (
  <div className="flex items-center justify-center lg:justify-end gap-1">
   {socialLinks.map((social, index) => (
    <React.Fragment key={index}>
     <a
      href={social.href}
      className="w-8 h-8 flex items-center justify-center transition-colors"
     >
      {social.icon}
     </a>
     {index < socialLinks.length - 1 && <Separator orientation="vertical" />}
    </React.Fragment>
   ))}
  </div>
 );
};

const Footer = () => {
 // Data for footer sections
 const footerSections = [
  {
   title: "We Are ROSHN",
   links: [
    { href: "/leadership", label: "Leadership" },
    { href: "/brand-story", label: "The Brand Story" },
    { href: "/vision-2030", label: "Vision 2030" },
    { href: "/awards", label: "Our Awards" },
    { href: "/sponsorships", label: "Sponsorships" },
   ],
  },
  {
   title: "Communities",
   links: [
    { href: "/communities/sedra", label: "SEDRA" },
    { href: "/communities/alarous", label: "ALAROUS" },
    { href: "/communities/warefa", label: "WAREFA" },
    { href: "/communities/almanar", label: "ALMANAR" },
    { href: "/communities/aldanah", label: "ALDANAH" },
    { href: "/communities/alfulwa", label: "ALFULWA" },
   ],
  },
  {
   title: "By ROSHN Group",
   links: [
    { href: "/marafy", label: "MARAFY" },
    { href: "/roshn-front", label: "ROSHN Front" },
    { href: "/roshn-stadium", label: "ROSHN Stadium" },
   ],
  },
 ];

 const additionalLinks = [
  { href: "/faqs", label: "FAQ's" },
  { href: "/careers", label: "Careers" },
  { href: "/roshn-care", label: "ROSHN Care" },
  { href: "/partnerships", label: "Partnerships" },
 ];

 const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/disclaimers", label: "Disclaimers" },
  { href: "/whistleblowing", label: "Whistleblowing" },
 ];

 return (
  <footer className="bg-[#fafafa]">
   <div className="max-w-[1440px] mx-auto px-4 py-16">
    <div className="pb-20">
     <h1 className="text-7xl lg:text-[100px] text-secondary !font-[400]">
      Register Your
     </h1>
     <div className=" flex gap-5">
      <h1 className="text-7xl lg:text-[100px] text-secondary !font-[400]">
       Interest
      </h1>
      <AnimatedButton />
     </div>
    </div>

    {/* Main Footer Content */}
    <div className="flex justify-between mb-12 border-y py-20 border-border">
     {/* Footer Sections */}
     <div className="flex flex-wrap gap-10 lg:gap-20">
      {footerSections.map((section, index) => (
       <React.Fragment key={index}>
        <FooterSection title={section.title} links={section.links} />
        {index < footerSections.length - 1 && (
         <Separator orientation="vertical" />
        )}
       </React.Fragment>
      ))}
     </div>

     {/* ROSHN Logo & Arabic Text */}
     <div className="flex flex-col items-center lg:items-end space-y-6 border-s md:w-sm">
      <div className="text-center lg:text-right h-[400px] flex flex-col justify-between">
       {/* ROSHN Logo with Arabic text */}
       <div className="mb-6">
        <div>
         <img src="/roshn-footer-rebrand-logo.svg" alt="ROSHN Logo" />
        </div>
       </div>

       {/* Social Media */}
       <div className="text-center lg:text-right">
        <h4 className="text-sm font-medium text-foreground mb-4">
         Follow Us on Social Media
        </h4>
        <SocialIcons />
       </div>
      </div>
     </div>
    </div>

    {/* Additional Links */}
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-12">
     {additionalLinks.map((link) => (
      <FooterLink key={link.href} href={link.href}>
       {link.label}
      </FooterLink>
     ))}
    </div>

    <Separator className="mb-8" />

    {/* Bottom Footer */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
     {/* PIF Company Logo */}
     <div className="flex items-center gap-2">
      <div className="w-8 h-8 g-primary flex items-center justify-center">
       <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
       </svg>
      </div>
      <span>
       <img
        src={"/company-logo.svg"}
        className="w-52 h-20 -ms-10"
        alt="Company Logo"
       />
      </span>
     </div>

     {/* Copyright */}
     <div className="text-center">
      <p className="text-sm text-gray-800">
       Copyright © 2025 ROSHN. ROSHN Group. All Rights Reserved
      </p>
     </div>

     {/* Legal Links */}
     <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
      {legalLinks.map((link) => (
       <FooterLink key={link.href} href={link.href}>
        {link.label}
       </FooterLink>
      ))}
     </div>
    </div>
   </div>
  </footer>
 );
};

export default Footer;
