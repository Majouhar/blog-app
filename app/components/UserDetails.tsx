"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

function UserDetails() {
  const user = useSession();
  const [isDropdown, setIsDropdown] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (user.status == "authenticated") {
    return (
      <div className="relative flex justify-center items-center">
        <div
          ref={divRef}
          onClick={() => setIsDropdown((prev) => !prev)}
          className="rounded-full cursor-pointer mb-4 w-14 h-14 font-bold text-white bg-black flex items-center justify-center"
        >
          <p>{user.data.user?.name?.slice(0, 2)}</p>
          {isDropdown && (
            <div className="absolute bottom-0 text-black rounded px-2 py-1 shadow-[0_4px_6px_rgba(0,0,0,0.8)] ">
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  return <></>;
}

export default UserDetails;
