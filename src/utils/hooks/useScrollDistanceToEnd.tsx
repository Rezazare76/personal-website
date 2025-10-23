"use client";

import { useEffect, useState } from "react";

// fromTop mean its calc distance from top to the end
function useScrollDistanceToEnd(fromTop = true): number {
  const [scrollDistance, setScrollDistance] = useState<number>(0);

  const calculateScrollDistance = () => {
    if (typeof window == "undefined") return null;

    const windowHeight = window.innerHeight;
    const fullHeight = document.body.scrollHeight;
    const scrolled = window.scrollY;
    // Calculate the distance from the top or bottom, based on 'fromTop' value
    const distanceFromEnd = fullHeight - (scrolled + windowHeight);
    // Calculate the percentage of distance scrolled from the top or bottom
    const percentageScrolled = fromTop
      ? (scrolled / (fullHeight - windowHeight)) * 100
      : (distanceFromEnd / (fullHeight - windowHeight)) * 100;

    setScrollDistance(Math.min(100, Math.max(0, percentageScrolled))); // Ensure percentage is within 0-100
  };

  useEffect(() => {
    // Calculate the scroll distance initially
    if (typeof window !== "undefined") {
      calculateScrollDistance();
      window.addEventListener("scroll", calculateScrollDistance);
    }

    // Detach scroll event listener when component unmounts
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener("scroll", calculateScrollDistance);
    };
  }, []); // Empty dependency array ensures this effect runs only once after mount

  return scrollDistance;
}

export default useScrollDistanceToEnd;
