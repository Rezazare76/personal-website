"use client";
import "atropos/css";

import Atropos from "atropos/react";
import { FC, memo } from "react";

import { card3dProps } from "./type";

const Card3d: FC<card3dProps> = ({ className, children }) => {
  return (
    <Atropos
      className={`${className} overflow-visible [&_.atropos-inner]:!overflow-visible`}
      shadowScale={0}
      data-atropos-offset="-5"
      rotateTouch="scroll-y"
    >
      {children}
    </Atropos>
  );
};
export default memo(Card3d);
