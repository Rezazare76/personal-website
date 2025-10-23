import { IchildrenProps, IcommonProps, IeventHandlerProps } from "custom-type";
import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

type className = Pick<IcommonProps<HTMLDivElement>, "className">;

export type TinputProps = IeventHandlerProps<HTMLInputElement> &
  IinputcommonPrps & {
    inputmode?:
      | "numeric"
      | "text"
      | "decimal"
      | "tel"
      | "email"
      | "url"
      | "search";
    error?: boolean;
  };

export type TinputErrorProps = IchildrenProps & className;
export type TinputSuccess = IchildrenProps & className;
export interface IinputcommonPrps extends IcommonProps<HTMLInputElement> {
  extraClass?: string;
  type?: HTMLInputTypeAttribute;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  defaultValue?: string | number;
  maxLength?: number;
  autoComplete?: HTMLInputAutoCompleteAttribute;
}
