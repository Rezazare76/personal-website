import { memo } from "react";
import { TinputErrorProps } from "./input.type";

const InputError = ({
  children,
  className = "text-xs text-red-500 mt-2 ms-1",
}: TinputErrorProps) => {
  if (!children) return null;
  return (
    <span className={className} role="alert">
      {children}
    </span>
  );
};

export default memo(InputError);
