"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/images/Logo.png";
import UserDetails from "./UserDetails";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import useResponsive from "../hooks/useResponsive";

function Header() {
  const router = useRouter();
  const { isMediumScreen } = useResponsive();
  return (
    <header className="flex align-center justify-between  w-full px-6 py-2">
      <Image
        onClick={() => router.push("/")}
        className="cursor-pointer"
        alt="bloghub logo"
        src={Logo}
        width={isMediumScreen ? 70 : 100}
        height={isMediumScreen ? 20 : 30}
      />
      <UserDetails />
    </header>
  );
}

export default Header;
