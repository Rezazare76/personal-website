"use client";
import { memo, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useResponsiveOrientation } from "@/utils/hooks/useResponsiveOrientation";

import { SwitchButtonProps } from "./type";

const SwitchButton = ({
  active,
  items,
  activeClass,
  containerClass,
  dynamicBackgroundClass,
  isRounded,
  activeItemClass = "text-black ",
  disableClass = "cursor-pointer hover:text-secondary-500",
  itemClass = "font-medium",
  onClick,
  dir = "ltr",
  gap = 0,
  getAnimate,
  mediaQueryRules,
}: SwitchButtonProps) => {
  const width = 100 / items.length;
  const totalGap = (items.length - 1) * gap;
  // calculate the width of the active item considering the gap
  const adjustedWidth = `calc((100% - ${totalGap}px) / ${items.length})`;
  const [currentChoose, setCurrentChoose] = useState(active);
  const [animate, setAnimate] = useState(getAnimate);
  // Use the responsive orientation hook
  const currentDirection = useResponsiveOrientation<"vertical" | "horizontal">(
    mediaQueryRules || {
      1200: "horizontal",
    },
  );
  const isVertical = currentDirection === "vertical";

  const handleClick = (index: number) => {
    if (currentChoose === index) return; // Prevent re-clicking the same item
    setCurrentChoose(index);
    onClick?.(index);
    setAnimate(true);
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
  ): void => {
    if (e.key === "Enter") {
      handleClick(index);
    }
  };
  const getLeft = (index: number) => {
    return `calc(${index} * (${adjustedWidth} + ${gap}px))`;
  };

  useEffect(() => {
    setCurrentChoose(active);
    setAnimate(true);
  }, [active, width]);
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 300); // Adjust the duration to match your animation duration
      return () => clearTimeout(timer);
    }
  }, [animate]);
  return (
    <div
      className={`${containerClass} relative flex select-none items-center justify-between`}
      dir={dir}
      style={{
        gap: `${gap}px`,
        flexDirection: isVertical ? "column" : "row",
      }}
    >
      {items.map((item, index) => {
        return (
          <div
            className={`${dir == "ltr" && index == items.length - 1 ? "border-r-0" : ""} ${
              dir == "ltr" && index == 0 ? "border-l-0" : ""
            } ${itemClass} ${item.className} ${currentChoose == index ? activeItemClass : disableClass} relative z-[1] flex h-full items-center justify-center text-center transition-all`}
            style={{
              width: isVertical ? "auto" : `${width}%`,
              height: isVertical ? `${width}%` : "auto",
            }}
            onClick={() => handleClick(index)}
            key={uuid()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {item.node}
          </div>
        );
      })}

      <span
        className={` ${!isRounded && "p-1"} ${currentChoose == 0 && "pe-0"} ${
          currentChoose == items.length - 1 && "ps-0"
        } ${dynamicBackgroundClass}  absolute h-full transition-all  duration-300`}
        style={{
          width: isVertical ? "100%" : adjustedWidth,
          height: isVertical ? adjustedWidth : "100%",
          left: isVertical ? "auto" : getLeft(currentChoose),
          top: isVertical ? getLeft(currentChoose) : "auto",
        }}
      >
        <div
          className={`${getAnimate && animate ? "scale-105  " : "scale-100  "} ${activeClass}
           h-full w-full transition-all duration-300`}
        />
      </span>
    </div>
  );
};

export default memo(SwitchButton);
