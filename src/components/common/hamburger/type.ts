import { containerClassProps, onClickProps } from "@/types/common";

export type HamburgerProps = onClickProps &
  containerClassProps & {
    isOpen: boolean;
  };
