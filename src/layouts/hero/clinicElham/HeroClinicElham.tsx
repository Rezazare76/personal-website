import "./style.scss";

import React from "react";

import ClinicElhamHeader from "./header/ClinicElhamHeader";

const HeroClinicElham = () => {
  return (
    <section
      className={`font-yekan elham relative  w-full`}
      dir="rtl"
      aria-hidden
    >
      <div className="bg-gray-850 sticky top-6 h-screen  rounded-t-2xl" />
      <div className="bg-elham-bg sticky top-6 h-[700px]  rounded-2xl" />
      {/* header */}
      <ClinicElhamHeader />
      {/* end header */}
    </section>
  );
};

export default HeroClinicElham;
