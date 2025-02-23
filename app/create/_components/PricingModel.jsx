import React, { useEffect } from "react";
import HeadingDesc from "./HeadingDesc";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
function PricingModel({ onHandleInputChange, formData }) {
  const { user } = useUser();
  useEffect(() => {
    if (formData?.title && typeof window != "undefined") {
      window.localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);
  return (
    <div className="">
      <HeadingDesc
        title={Lookup.LogoPricingModelTitle}
        description={Lookup.LogoPricingModelDesc}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
        {Lookup.pricingOption.map((option, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-5 border rounded-2xl"
          >
            <Image
              src={option.icon}
              alt={option.title}
              width={60}
              height={60}
              className="h-10 w-10"
            />
            <h2 className="font-medium text-2xl">{option.title}</h2>

            <div>
              {option.featuers.map((feature, index) => (
                <h2 key={index} className="text-lg mt-3 flex flex-row gap-2">
                  <Check />
                  {feature}
                </h2>
              ))}
            </div>
            {user ? (
              <Link href={`/generate-logo?type=${option.title}`}>
                <Button className="mt-5 w-full">{option.buttom}</Button>
              </Link>
            ) : (
              <SignInButton
                mode="modal"
                forceRedirectUrl={"/generate-logo?type=" + option.title}
              >
                <Button className="mt-5 w-full">{option.buttom}</Button>
              </SignInButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingModel;
