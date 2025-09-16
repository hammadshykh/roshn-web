// app/layout.tsx
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import LoadingPage from "@/components/LoadingPage";
import Footer from "@/components/layout/Footer";
import React from "react";
import Script from "next/script";
import AccessibilityProvider from "@/components/AccessibilityProvider";

// ✅ Import IBM Plex Arabic
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
 weight: ["100", "200", "300", "400", "500", "600", "700"],
 subsets: ["arabic"],
 variable: "--font-ibm-plex-arabic",
});

export const metadata: Metadata = {
 title: "Rosh Clone Landing Page",
 description:
  "Landing page clone built with Next.js 15, Tailwind v4, GSAP, Shadcn UI",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body
    className={`${ibmPlexArabic.variable} ${ibmPlexArabic.className} antialiased`}
    style={{
     fontSize: "16px",
     lineHeight: "19px",
     fontWeight: 400,
    }}
   >
    {/* ✅ Top Loader - You might want to remove this if using custom LoadingPage */}
    <NextTopLoader
     color="#ffffff"
     height={3}
     crawlSpeed={200}
     showSpinner={false}
    />
    {/* ✅ Custom Loading Page */}
    <LoadingPage />
    {/* ✅ Main Content */}
    <a className="skip-link" href="#main">
     Skip to content
    </a>
    {/* <AccessibilityProvider /> */}
    <div className="min-h-screen">{children}</div>
    <Footer />
    {/* UserWay Accessibility Widget */}
    <Script
     id="userway-widget"
     src="https://cdn.userway.org/widget.js"
     strategy="afterInteractive" // ✅ load karega jab page interactive ho jaye
     data-account="2hNanEaz1l"
    />
   </body>
  </html>
 );
}
