'use client'

import React, { useEffect, useState } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({onHandleInputChange, formData}) {
  const searchParams = useSearchParams()
  const [title, setTitle] = useState(searchParams.get('title'));
  useEffect(() => {
    onHandleInputChange(title);
  }, [title]); 
  return (
    <div className="my-10">
      <HeadingDesc
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />
      <input
        type="text"
        placeholder={Lookup.HeroInputTitelPlaceHolder}
        className="p-4 border rounded-lg mt-5 w-full"
        defaultValue={title}
        onChange={(e)=> onHandleInputChange(e.target.value)}
        value={formData?.title}
      />
    </div>
  );
}

export default LogoTitle;
