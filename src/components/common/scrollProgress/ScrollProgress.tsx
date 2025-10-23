"use client";

import useScrollDistanceToEnd from "@/utils/hooks/useScrollDistanceToEnd";

const ScrollProgress = () => {
  const toEnd = useScrollDistanceToEnd();
  return (
    <span
      className="bg-primary-700 fixed left-0 top-0 z-[10] block h-[2px]"
      style={{ width: toEnd + "%" }}
    />
  );
};

export default ScrollProgress;
