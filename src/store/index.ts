import { createContext } from "react";

import { modalsContainerSectionsType } from "@/types/common";

export const ModalsContainerContext = createContext<{
  setShowModal: (arg: "hide") => void;
  setSection: (arg: modalsContainerSectionsType) => void;
  showModal?: "open" | "hide";
}>({ setShowModal: () => {}, setSection: () => {} });
