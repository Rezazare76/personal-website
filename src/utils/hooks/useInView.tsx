"use client";
//when element come to the scroll view then return true ( this is good for code splitting)
import { useEffect, useRef, useState } from "react";

const useInView = () => {
  const [isInView, setIsInView] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const ref = useRef<HTMLElement | null | any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !firstLoad) setFirstLoad(true);
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return { ref, isInView, firstLoad };
};

export default useInView;
