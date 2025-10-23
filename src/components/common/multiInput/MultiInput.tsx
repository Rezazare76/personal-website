"use client";

import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import style from "./style.module.scss";
import { MultiInputProps } from "./type";

const MultiInput: FC<MultiInputProps> = ({
  onAllInputsFilled,
  containerClassName = "w-full hover:border-blue-200 focus:border-blue-200  gap-2",
  maxLength,
  error,
  errorMessage,
  errorClass = "mx-1 text-[0.83rem] font-[500]",
}) => {
  const [inputValues, setInputValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (Number(value) || value == "0" || value == "") {
      const newInputValues = [...inputValues];
      if (value && newInputValues[index]) {
        newInputValues[index] = value;
        setInputValues(newInputValues);
        inputRefs.current[index + 1]?.focus();
      } else if (value && index >= 0) {
        newInputValues[index] = value;
        setInputValues(newInputValues);
        // Move focus to the previous input if the current input is empty
        inputRefs.current[index + 1]?.focus();
      }
      onAllInputsFilled(newInputValues.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const newInputValues = [...inputValues];

    // Handle ArrowLeft and ArrowRight for navigation

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) inputRefs.current[index - 1]?.focus();
      else inputRefs.current[index - 1]?.focus();
      return;
    }
    if (e.key === "ArrowRight" && index < inputValues.length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if ((e.key === "Backspace" || e.key === "Delete") && index >= 0) {
      // Move focus to the previous input if Backspace is pressed and the current input is empty
      if (!newInputValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (newInputValues[index] && index >= 0) {
        newInputValues[index] = "";
        setInputValues(newInputValues);
      }
    } else if (newInputValues[index] && index < inputValues.length - 1) {
      if (Number(e.key) || e.key == "0") {
        newInputValues[index] = e.key;
        setInputValues(newInputValues);
        inputRefs.current[index + 1]?.focus();
      } else inputRefs.current[index + 1]?.focus();
    } else if (newInputValues[index] && index == inputValues.length - 1) {
      if (Number(e.key) || e.key == "0") {
        newInputValues[index] = e.key;
        setInputValues(newInputValues);
        inputRefs.current[index + 1]?.focus();
      }
    }
    onAllInputsFilled(newInputValues.join(""));
  };
  //handle when click on the container for select last empty input
  const handleContainerClick = () => {
    if (inputValues.lastIndexOf("") == -1) return inputRefs.current[3]?.focus();
    for (let i = 3; i >= 0; --i) {
      if (inputValues[i]) {
        inputRefs.current[i + 1]?.focus();
        break;
      } else if (i == 0) inputRefs.current[0]?.focus();
    }
  };

  return (
    <>
      <div
        className={`${containerClassName} ${style.container} ${
          error ? " text-red-500" : "text-[#26292d]"
        } font-yekan-fa-num flex items-center justify-center overflow-hidden `}
        dir="ltr"
        onClick={handleContainerClick}
        role="button"
        tabIndex={0}
      >
        {inputValues.map((value, index) => (
          <input
            inputMode="numeric"
            placeholder="-"
            key={index}
            // @ts-ignore
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            maxLength={maxLength}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            className={`${style.inputLoad} ${error ? "!border-red-500" : "border-[#ebecf0]"} h-14 w-14 rounded-[8px] border  bg-white px-2 py-[14px] text-center`}
            dir="ltr"
            autoFocus={index == 0 && true}
            onClick={(e) => e.stopPropagation()}
            autoComplete="new-password"
          />
        ))}
      </div>

      {error && errorMessage && (
        <span className={`${errorClass} mt-4 tracking-tight text-red-600`}>
          {errorMessage}
        </span>
      )}
    </>
  );
};
export default memo(MultiInput);
