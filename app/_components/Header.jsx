"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUser();
  return (
    <div className="px-10 lg:px-32 xl:px48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <Image src="/logo.svg" width={180} height={100} alt="logo" />
      <div className="flex gap-3 items-center">
        {user ? (
          <Link href='/dashboard'>
          <Button variant="outline">Dashboard</Button>
          </Link>
        ) : (
          <SignInButton mode="modal" forceRedirectUrl={"/generate-logo?type="}>
          <Button>Get Started</Button>
          </SignInButton>

        )}
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
