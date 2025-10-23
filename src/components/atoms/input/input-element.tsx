import { memo } from "react";

import { TinputProps } from "./input.type";

const InputElement = ({
  className = "w-full  text-[0.788rem] sm:text-base border-2 border-[#EBECF0] placeholder:text-right placeholder:text-[#DFE1E6] h-[46px] font-[400]   focus:border-blue-400 hover:border-blue-200 transition-all  px-[14px] rounded-[8px]     ",
  extraClass,
  id,
  name,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  type = "text",
  placeholder,
  disabled,
  required,
  autoFocus,
  readOnly,
  ref,
  dir,
  inputmode,
  error,
}: TinputProps) => {
  return (
    <input
      id={id}
      name={name}
      ref={ref}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      autoFocus={autoFocus}
      readOnly={readOnly}
      className={`${className} ${extraClass} ${error ? "!border !border-red-500 placeholder:!text-red-500" : ""} transition-all`}
      dir={dir}
      inputMode={inputmode}
      {...(disabled ? { "aria-invalid": "true" } : {})}
      {...(required ? { "aria-required": "true" } : {})}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  );
};
export default memo(InputElement);
