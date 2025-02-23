"use client";
import React, { useState } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import LogoDesig from "@/app/_data/LogoDesig";

function LogoDesign({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {LogoDesig.map((desing, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(desing.title);
              onHandleInputChange(desing);
            }}
            className={`border-primary p-1 rounded-xl cursor-pointer hover:border-2 ${
              selectedOption == desing.title && "border-2 "
            }`}
          >
            <Image
              src={desing.image}
              alt={desing.title}
              width={300}
              height={200}
              className="w-full rounded-xl h-[150px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesign;
