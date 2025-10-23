"use client";
// this is upgraded of onBlurChild function in utils/index
// and also if change tab its not run function and have better UX
import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  callback: () => void,
  refs?: any[],
) => {
  const defaultRef = useRef<T>(null);

  useEffect(() => {
    if (typeof window == "undefined") return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const allRefs = refs ?? [defaultRef];
      if (
        allRefs.every(
          (ref) => ref.current && !ref.current.contains(event.target as Node),
        )
      ) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      }
    };
  }, [callback, refs]);
  return refs ? undefined : defaultRef;
};

export const onBlurChild = (
  event: React.FocusEvent<HTMLElement, Element>,
  set: () => void,
) => {
  const nextFocus = event.relatedTarget;
  if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
    set();
  }
};
