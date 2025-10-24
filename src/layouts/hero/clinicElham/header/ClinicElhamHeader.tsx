"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useClickOutside } from "@/utils/hooks/useClickOutSide";

import SubMenu from "./subMenu/SubMenu";

const ClinicElhamHeader = () => {
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const handleClickMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (showSubMenu) setShowSubMenu(false);
  });

  return (
    <header className=" sticky top-6 z-[1] h-[50px]   pt-11">
      <div className=" relative z-[8] mx-auto  flex  h-[58px] w-full  items-center justify-center gap-5    font-medium lg:w-[907px]">
        <Link
          className="elham-header-text-animate absolute  h-[57px] w-0 cursor-pointer xl:w-[127px]"
          href={process.env.NEXT_PUBLIC_CLINIC_ELHAM || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/images/sites/clinic-elham/logo/header-text.webp"
            alt="کلینیک الهام"
            width={127}
            height={127}
          />
        </Link>
        <div
          className="elham-header-animate bg-elham-custom-600 shadow-elham-custom-sm relative flex h-full w-full  
          items-center justify-between rounded-full
           px-[14px] py-2 text-base font-normal shadow-[#150E38]"
        >
          <div className="flex items-center gap-3">
            <Link
              className="elham-header-logo-animate relative flex h-[47px] w-[67px]"
              href={process.env.NEXT_PUBLIC_CLINIC_ELHAM || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/sites/clinic-elham/logo/small-logo.svg"
                alt="کلینیک الهام"
                width={67}
                height={47}
              />
            </Link>
            <nav className="focus-visible-none flex items-center gap-7 text-[1.03rem] font-normal">
              {/* Creating a list item with click event to toggle submenu */}
              <div
                className="relative flex cursor-pointer items-center py-[11px] -tracking-wide "
                onClick={handleClickMenu}
                title="خدمات کلینیک"
                ref={ref}
                tabIndex={0}
                role="button"
              >
                <Image
                  src="/images/sites/clinic-elham/icons/arrow-down-s.svg"
                  alt="arrow down"
                  className={`${
                    showSubMenu ? "rotate-[-180deg]" : ""
                  } mx-2 transition-all  `}
                  width={12}
                  height={7}
                />
                <span className="ms-1 pe-[1px] tracking-tighter">خدمات</span>
                کلینیک
                <aside
                  className={`${showSubMenu ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"} shadow-gradient-blue absolute   right-[-94px] top-[64px] z-[20]
                   h-[401px] w-[907px] cursor-default 
                rounded-3xl transition-all duration-300`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className={`tool-tip relative z-[2] flex h-full min-h-[450px] w-full items-stretch gap-[23px] rounded-3xl
                   border border-gray-200 px-[26px]  py-[33px]  `}
                  >
                    <SubMenu />
                  </div>
                </aside>
              </div>
              <div
                className="word-space-1 relative flex cursor-pointer  items-center py-[11px] text-[1.02rem] tracking-tighter"
                title="درباره ما"
              >
                درباره ما
              </div>
              <div
                className="relative flex cursor-pointer  items-center py-[11px] tracking-tight"
                title="وبلاگ"
              >
                وبلاگ
              </div>
              <div
                className="word-space-1 relative flex cursor-pointer items-center py-[11px] tracking-tighter "
                title="گالری تصاویر"
              >
                گالری تصاویر
              </div>
              <div
                className="relative -ms-1.5 flex cursor-pointer items-center py-[11px]"
                title="تماس با ما"
              >
                تماس با ما
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>
    </header>
  );
};

export default ClinicElhamHeader;
