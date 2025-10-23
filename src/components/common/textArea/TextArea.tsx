import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";

import style from "./style.module.scss";
import TextAreaProps from "./type";

const TextArea = ({
  mainContainerClass,
  containerClass = "px-4 py-3 focus:border-blue-200 text-black w-full focus:border-blue-500   border border-gray-100 bg-secondary-400    font-medium rounded-[4px]",
  className = " text-sm ",
  minHeight = 100,
  maxHeight = 3000,
  onChange,
  placeholder,
  value,
  disabled,
  errorMessage,
  error,
  id,
  cols,
  name,
  required,
  rows,
  onInput,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false); // Track focus state
  //height of textarea
  const [height, setHeight] = useState(minHeight); // Default height
  //mobile touch section
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [startY, setStartY] = useState<number | null>(null); // Starting Y position
  // Resizing function handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    setHeight((prevHeight) => {
      const newHeight = prevHeight + e.movementY; // Adjust height by vertical movement
      return Math.max(minHeight, Math.min(newHeight, maxHeight)); // Ensure height is within bounds
    });
  };
  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  // Clean up listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  //text area auto height section
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Reset the height to auto to allow shrinking as well
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      // Set height to match content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange?.(e.target.value);
    onInput?.(e.target.value);

    // onChange && onChange(e); // Call the provided onChange handler if exists
  };
  // Initialize the height based on initial content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]); // Runs when the value changes
  //handle touch

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Record the initial Y position when touch starts
      setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (startY !== null) {
        const currentY = e.touches[0].clientY;
        // Calculate the movement distance
        const distanceMoved = currentY - startY;
        setHeight(
          height + distanceMoved > minHeight
            ? height + distanceMoved
            : minHeight,
        );
      }
    };

    const imgElement = imgRef.current;
    if (imgElement) {
      imgElement.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      imgElement.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
    }
    // Clean up event listeners on component unmount
    return () => {
      if (imgElement) {
        imgElement.removeEventListener("touchstart", handleTouchStart);
        imgElement.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [minHeight, startY]);

  return (
    <div className={mainContainerClass}>
      <div
        className={`${error && "border-danger"} ${
          disabled
            ? style.disabled
            : "hover:border-[#C6C6C6] focus:border-[#C6C6C6]"
        } ${isFocused ? "border-focus" : ""} ${containerClass} relative flex flex-col`}
        style={{ height }}
      >
        <div
          className={`${style.scroll} flex h-full overflow-y-auto overflow-x-hidden`}
        >
          <textarea
            ref={textareaRef}
            className={`${className}    relative h-full min-h-[90%] w-full resize-none placeholder:text-right placeholder:text-gray-300`}
            name={name}
            cols={cols}
            rows={rows}
            id={id}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onInput={handleInput} // Triggers on each input change
            style={{ overflowY: "hidden" }} // Prevents default scrollbar appearance
            required={required}
            onFocus={() => setIsFocused(true)} // Set focus state
            onBlur={() => setIsFocused(false)} // Reset focus state
          />
        </div>
        <Image
          src="/images/icons/resizer.svg"
          className="absolute bottom-[4.5px] left-[4.5px] cursor-n-resize"
          ref={imgRef}
          alt="تغییر سایز"
          width={10}
          height={12}
          onMouseDown={handleMouseDown}
        />
      </div>
      {errorMessage && error && (
        <span className="m-1 text-[0.7rem] text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};

export default memo(TextArea);
