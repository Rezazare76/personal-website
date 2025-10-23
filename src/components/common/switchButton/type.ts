import { ReactNode } from "react";

export interface SwitchButtonProps {
  items: { className?: string; node: ReactNode }[];
  containerClass?: string;
  itemClass?: string;
  dynamicBackgroundClass?: string;
  onClick?: (arg: number) => void;
  active: number;
  activeClass?: string;
  isRounded?: boolean;
  dir?: "rtl" | "ltr";
  activeItemClass?: string;
  disableClass?: string;
  gap?: number;
  getAnimate?: boolean;
  mediaQueryRules?: {
    [key: number]: "vertical" | "horizontal";
  };
}
