import "./style.css";

import React, { memo } from "react";

import Button from "../button/Button";
import { HamburgerProps } from "./type";

const Hamburger = ({ containerClass, isOpen, onClick }: HamburgerProps) => {
  return (
    <Button
      onClick={onClick}
      className={`${containerClass} ${isOpen ? "open" : ""} hamburger !block  !scale-100 !border-none`}
      aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
    >
      <span></span>
      <span></span>
      <span></span>
      <div className="sr-only">{isOpen ? "بستن منو" : "باز کردن منو"}</div>
    </Button>
  );
};

export default memo(Hamburger);
