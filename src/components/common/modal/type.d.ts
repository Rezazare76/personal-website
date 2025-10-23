import { ReactNode } from "react";

export interface ModalProps {
  containerClassName?: string;
  closeClick: () => void;
  children?: ReactNode;
  showModal: "open" | "hide" | "close";
  defaultClass?: string;
  showDark?: boolean;
  fromBottom?: boolean;
  delay?: number;
  darkClass?: string;
  runFunctions?: boolean;
  id?: string;
  bookmarkId?: string;
  fromUrl?: boolean;
}
