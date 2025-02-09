"use client";

import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

function Auth() {
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
