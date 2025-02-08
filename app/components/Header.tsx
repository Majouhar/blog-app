import Image from "next/image";
import React from "react";
import Logo from "@/images/Logo.png";
import UserDetails from "./UserDetails";

function Header() {
  return (
    <header className="flex align-center justify-between  w-full px-6 py-2">
      <Image
        className="cursor-pointer"
        alt="bloghub logo"
        src={Logo}
        width={100}
        height={30}
      />
      <UserDetails />
    </header>
  );
}

export default Header;
