"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("'");

  const handleSubmit = async () => {
    setLoading(true);
    // Perform sign-in logic here
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (result && !result.error) {
      toast.success("Authenticated");
      const callbackUrl = new URLSearchParams((result.url ?? "").split("?")[1]);

      router.replace(callbackUrl.get("callbackUrl") ?? "/");
    } else if (result?.error) {
      toast.error(result?.error ?? "");
    }
  };
  return (
    <div className="flex a-center j-center">
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;
