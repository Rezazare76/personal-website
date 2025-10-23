import { IchildrenProps, IcommonProps, IlabelCommonProps } from "custom-type";

export type TlabelProps = IcommonProps<HTMLInputElement> &
  IchildrenProps &
  IlabelCommonProps & {
    extraClass?: string;
  };
