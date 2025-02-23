'use client'
import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const [logoTitel, setLogoTitle] = useState("");
  return (
    <div className="flex items-center mt-24 flex-col gap-5">
      <h2 className="text-primary text-5xl text-center font-bold">
        {Lookup.HeroHeading}
      </h2>
      <h2 className="text-5xl text-center font-bold">
        {Lookup.HeroSubHeading}
      </h2>
      <p className="text-lg text-gray-500 text-center">{Lookup.HeroDesc}</p>
      <div className="flex gap-6 w-full max-w-2xl mt-10">
        <input
          type="text"
          placeholder={Lookup.HeroInputTitelPlaceHolder}
          className="p-3 border rounded-md w-full shadow-md"
          onChange={(e) => setLogoTitle(e.target.value)}
        />
        <Link href={`/create?title=${logoTitel}`}>
          <Button className="w-full p-6">{Lookup.HeroButton}</Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
