// components/A11yToolbar.tsx
"use client";

import React, { useState } from "react";
import { useA11y } from "@/hooks/useA11y";
import {
 Eye,
 Type,
 Contrast,
 Accessibility,
 Link,
 RefreshCcw,
 Move,
} from "lucide-react"; // icons (optional)

export default function A11yToolbar() {
 const { fontSize, setFontSize, features, toggleFeature, reset } = useA11y();
 const [open, setOpen] = useState(false);

 return (
  <>
   {/* Toggle Button (floating) */}
   <button
    onClick={() => setOpen(!open)}
    aria-expanded={open}
    aria-controls="a11y-sidebar"
    className="fixed top-1/2 right-4 !z-[400] flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
   >
    <Accessibility className="w-6 h-6" />
   </button>

   {/* Sidebar */}
   <aside
    id="a11y-sidebar"
    className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 shadow-2xl z-40 flex flex-col ${
     open ? "translate-x-0" : "translate-x-full"
    }`}
    role="complementary"
    aria-label="Accessibility options"
   >
    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
     <h2 className="text-lg font-semibold">Accessibility</h2>
     <button
      onClick={() => setOpen(false)}
      aria-label="Close accessibility sidebar"
      className="text-gray-400 hover:text-white"
     >
      ✕
     </button>
    </div>

    {/* Options */}
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
     {/* Font size controls */}
     <div>
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
       <Type className="w-4 h-4" /> Font Size
      </h3>
      <div className="flex items-center gap-2">
       <button
        onClick={() => setFontSize(fontSize - 10)}
        aria-label="Decrease font size"
        className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
       >
        A−
       </button>
       <span className="text-sm">{fontSize}%</span>
       <button
        onClick={() => setFontSize(fontSize + 10)}
        aria-label="Increase font size"
        className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
       >
        A+
       </button>
      </div>
     </div>

     {/* Toggles */}
     <div className="space-y-3">
      <ToggleButton
       label="High Contrast"
       active={features.highContrast}
       onClick={() => toggleFeature("highContrast")}
       icon={<Contrast className="w-4 h-4" />}
      />
      <ToggleButton
       label="Dyslexia Font"
       active={features.dyslexia}
       onClick={() => toggleFeature("dyslexia")}
       icon={<Type className="w-4 h-4" />}
      />
      <ToggleButton
       label="Highlight Links"
       active={features.highlightLinks}
       onClick={() => toggleFeature("highlightLinks")}
       icon={<Link className="w-4 h-4" />}
      />
      <ToggleButton
       label="Reduce Motion"
       active={features.reduceMotion}
       onClick={() => toggleFeature("reduceMotion")}
       icon={<Move className="w-4 h-4" />}
      />
     </div>
    </div>

    {/* Footer */}
    <div className="px-4 py-3 border-t border-gray-700">
     <button
      onClick={reset}
      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-sm font-medium"
     >
      <RefreshCcw className="w-4 h-4" /> Reset Settings
     </button>
    </div>
   </aside>
  </>
 );
}

/* Reusable toggle button */
function ToggleButton({
 label,
 active,
 onClick,
 icon,
}: {
 label: string;
 active: boolean;
 onClick: () => void;
 icon?: React.ReactNode;
}) {
 return (
  <button
   onClick={onClick}
   aria-pressed={active}
   className={`w-full flex items-center justify-between px-3 py-2 rounded border text-sm ${
    active
     ? "bg-purple-600 border-purple-500 text-white"
     : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
   }`}
  >
   <span className="flex items-center gap-2">
    {icon} {label}
   </span>
   <span
    className={`inline-block w-3 h-3 rounded-full ${
     active ? "bg-green-400" : "bg-gray-500"
    }`}
   />
  </button>
 );
}
