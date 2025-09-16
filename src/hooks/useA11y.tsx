// hooks/useA11y.tsx
"use client";

import React, {
 createContext,
 useContext,
 useEffect,
 useMemo,
 useState,
 ReactNode,
} from "react";
import { defaultA11yConfig, FeatureKey } from "@/lib/a11y-config";

const STORAGE_PREFIX = "a11y_";

type A11yState = {
 fontSize: number;
 features: Record<FeatureKey, boolean>;
};

type A11yContextValue = A11yState & {
 setFontSize: (n: number) => void;
 toggleFeature: (k: FeatureKey) => void;
 reset: () => void;
};

const A11yContext = createContext<A11yContextValue | undefined>(undefined);

function loadFromStorage(): A11yState {
 try {
  const font = parseInt(
   localStorage.getItem(`${STORAGE_PREFIX}fontSize`) ?? "",
   10
  );
  const featuresSaved = JSON.parse(
   localStorage.getItem(`${STORAGE_PREFIX}features`) ?? "null"
  ) as Record<string, boolean> | null;

  return {
   fontSize: Number.isFinite(font) ? font : defaultA11yConfig.fontSize.default,
   features: featuresSaved ?? defaultA11yConfig.features,
  };
 } catch {
  return {
   fontSize: defaultA11yConfig.fontSize.default,
   features: defaultA11yConfig.features,
  };
 }
}

export function A11yProvider({ children }: { children: ReactNode }) {
 const [state, setState] = useState<A11yState>(() => {
  if (typeof window === "undefined") {
   // during SSR return defaults
   return {
    fontSize: defaultA11yConfig.fontSize.default,
    features: defaultA11yConfig.features,
   };
  }
  return loadFromStorage();
 });

 // apply DOM effects and persist
 useEffect(() => {
  // font-size
  document.documentElement.style.fontSize = `${state.fontSize}%`;
  localStorage.setItem(`${STORAGE_PREFIX}fontSize`, String(state.fontSize));

  // features -> manipulate classes on documentElement
  const classMap: Record<FeatureKey, string> = {
   highContrast: "a11y-high-contrast",
   dyslexia: "a11y-dyslexia",
   reduceMotion: "a11y-reduce-motion",
   highlightLinks: "a11y-highlight-links",
  };

  Object.entries(state.features).forEach(([k, enabled]) => {
   const key = k as FeatureKey;
   const cls = classMap[key];
   if (enabled) document.documentElement.classList.add(cls);
   else document.documentElement.classList.remove(cls);
  });

  localStorage.setItem(
   `${STORAGE_PREFIX}features`,
   JSON.stringify(state.features)
  );
 }, [state]);

 const setFontSize = (n: number) =>
  setState((s) => ({ ...s, fontSize: Math.min(Math.max(n, 70), 200) }));

 const toggleFeature = (k: FeatureKey) =>
  setState((s) => ({
   ...s,
   features: { ...s.features, [k]: !s.features[k] },
  }));

 const reset = () =>
  setState({
   fontSize: defaultA11yConfig.fontSize.default,
   features: defaultA11yConfig.features,
  });

 const value = useMemo(
  () => ({ ...state, setFontSize, toggleFeature, reset }),
  [state]
 );

 return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y() {
 const ctx = useContext(A11yContext);
 if (!ctx) throw new Error("useA11y must be used inside A11yProvider");
 return ctx;
}
