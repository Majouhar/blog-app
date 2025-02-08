"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  return (
    <section className="flex a-center j-center">
      {isLogin ? (
        <Login toggleLogin={toggleLogin} />
      ) : (
        <SignUp toggleLogin={toggleLogin} />
      )}
    </section>
  );
}

export default Auth;
