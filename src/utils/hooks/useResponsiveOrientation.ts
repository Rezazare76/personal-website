"use client";
import { useEffect, useState } from "react";

import { debounce } from "../utility";

type MediaQueryRules<T> = {
  [key: number]: T;
};
/**
 * Hook to determine responsive value based on screen width
 * @param mediaQueryRules - Object where keys are breakpoints and values are associated data
 * @returns The value corresponding to the current screen width
 */
export const useResponsiveOrientation = <T>(
  mediaQueryRules: MediaQueryRules<T>,
): T | undefined => {
  const [currentValue, setCurrentValue] = useState<T>();
  useEffect(() => {
    const updateValue = () => {
      const currentWidth = window.innerWidth;
      const breakpoints = Object.keys(mediaQueryRules)
        .map(Number)
        .sort((a, b) => a - b);
      const selectedBreakpoint =
        breakpoints.find((bp) => currentWidth <= bp) ??
        breakpoints[breakpoints.length - 1];
      setCurrentValue(mediaQueryRules[selectedBreakpoint]);
    };
    const debouncedUpdate = debounce(updateValue, 100);
    updateValue(); // Set initial value
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [mediaQueryRules]);

  return currentValue;
};
