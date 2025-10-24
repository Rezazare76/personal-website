import "./style.css";

import Image from "next/image";
import { memo } from "react";

const Header = () => {
  return (
    <header className="relative z-[1]  mx-auto  flex w-full max-w-[1440px] ">
      <div className="absolute  -top-6  left-1/2 w-[97%] -translate-x-1/2">
        <Image
          src="/images/flat/gray-900-header-template.svg"
          className="h-[95px] "
          alt="gray-900-header-template-bg"
          width={1440}
          height={64}
        />
      </div>
    </header>
  );
};

export default memo(Header);
