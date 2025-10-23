import { memo } from "react";
import { TinputSuccess } from "./input.type";

const InputSuccess = ({
  className = "text-xs text-green-500 mt-1 ms-2",
  children,
}: TinputSuccess) => {
  if (!children) return null; // Avoid rendering empty error messages

  return (
    <span className={className} role="alert">
      {children}
    </span>
  );
};

export default memo(InputSuccess);
