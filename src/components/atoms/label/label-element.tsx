import { memo } from "react";

import { TlabelProps } from "./label.type";

const labelElement = ({
  className = "px-[5px] py-2 block leading-[27px] text-sm sm:text-base font-medium",
  htmlFor,
  extraClass,
  children,
}: TlabelProps) => {
  if (!children) return null;
  return (
    <label htmlFor={htmlFor} className={`${className} ${extraClass} `}>
      {children}
    </label>
  );
};
export default memo(labelElement);
