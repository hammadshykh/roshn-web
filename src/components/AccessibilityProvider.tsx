// components/AccessibilityProvider.tsx
"use client";

import React from "react";
import { A11yProvider } from "@/hooks/useA11y";
import A11yToolbar from "@/components/A11yToolbar";

export default function AccessibilityProvider({
 children,
}: {
 children?: React.ReactNode;
}) {
 return (
  <A11yProvider>
   {/* live region for announcements */}
   <div id="a11y-announcer" aria-live="polite" className="sr-only" />
   <A11yToolbar />
   {children}
  </A11yProvider>
 );
}
