"use client";
import { Chip } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

function UserDetails() {
  const user = useSession();
  const router = useRouter();

  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsDropdown(false);
    }
  };
  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    router.push("/");
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="relative flex justify-center items-center">
      {user.status == "authenticated" ? (
        <div
          ref={divRef}
          onClick={() => setIsDropdown((prev) => !prev)}
          className="rounded-full cursor-pointer mb-4 w-14 h-14 font-bold text-white bg-gray-800 flex items-center justify-center"
        >
          <p>{user.data.user?.name?.slice(0, 2)}</p>
          {isDropdown && (
            <div
              onClick={handleSignOut}
              className="absolute bottom-0 text-black rounded px-2 py-1 shadow-[0_4px_6px_rgba(0,0,0,0.8)] "
            >
              <p>Logout</p>
            </div>
          )}
        </div>
      ) : (
        <p
          onClick={() => router.push("/login")}
          className="bg-gray-800 text-white rounded px-3 py-1 cursor-pointer"
        >
          LOGIN
        </p>
      )}
    </div>
  );
}

export default UserDetails;
