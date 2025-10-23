"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { elhamHeaderMenu } from "./data";

/**
 * SubMenu component renders a list of services and their details in two columns.
 * It fetches the service data from the provided API endpoint and sets the active service when an item is clicked.
 */

const SubMenu = () => {
  const [active, setActive] = useState<number>(1);
  const [hover, setHover] = useState<null | number>(null);

  /**
   * Handles the click event for service items and sets the active service.
   * @param {number} inx - Index of the clicked service item.
   */
  // active items 2 in title list  just for first time

  return (
    <>
      <div className=" bg-elham-secondary-200 min-w-[269px] text-nowrap rounded-2xl ps-5">
        <div className="  mb-[18px] mt-9 ps-6 text-lg   -tracking-[1.2px]">
          <span className="font-medium">خدمات</span>{" "}
          <span className="font-medium tracking-normal">کلینیک</span>
        </div>
        <ul className="flex flex-col pt-1">
          {elhamHeaderMenu?.map(({ title }, inx) => {
            return (
              <li
                key={`elham-title-${inx}-${title}`}
                className={`${
                  typeof hover == "number"
                    ? hover == inx && "bg-elham-custom-400 "
                    : active == inx && "bg-elham-custom-400 "
                }    cursor-pointer rounded-r-lg py-2.5 pe-10 ps-6 
                text-[0.885rem] tracking-tight transition-all 
               duration-300  `}
                onClick={() => setActive(inx)}
                onMouseEnter={() => setHover(inx)}
                onMouseLeave={() => setHover(null)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </div>
      {elhamHeaderMenu?.map(({ list, icon }, inx) => {
        return (
          <ul
            className={`${
              inx !== active ? "hidden" : "fade-open grid"
            }  w-full grid-cols-2 content-start
       gap-x-3 gap-y-2 text-nowrap pt-1`}
            key={`header-sub-links-active-${inx}`}
          >
            {list?.map(({ name, content }, subInx) => (
              <li
                key={`sub-title-detail-${subInx}`}
                className="flex h-[76px]
          w-[277px]  cursor-not-allowed items-center gap-[19px] 
          rounded-xl py-1 pe-[25px] ps-[23px] hover:bg-[#f0effb]"
                title={name}
              >
                <Image
                  src={`/images/sites/clinic-elham/icons/${icon}.webp`}
                  alt={name}
                  className="shadow-elham-custom-lg shadow-elham-secondary-300 h-[50px] w-[50px]
                rounded-2xl object-none text-[#333363]"
                  width={50}
                  height={50}
                  unoptimized
                />
                <div className="  flex flex-col justify-between gap-[2px]">
                  <div className=" text-[1rem] tracking-tight">{name}</div>
                  <span
                    className="  text-elham-midnight-blue text-[0.79rem]
              tracking-normal"
                  >
                    {content}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        );
      })}
    </>
  );
};

export default SubMenu;
