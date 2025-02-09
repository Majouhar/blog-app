import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

function Login({ toggleLogin }: Readonly<{ toggleLogin: () => void }>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email.trim().length < 2 || password.trim().length < 8) {
      toast.error("Enter Valid Email/Password");
      return;
    }
    setLoading(true);
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
  if (loading) return <Loader />;
  return (
    <div className="max-w-md mx-auto my-12 p-6 rounded-lg shadow-lg bg-white sm:max-w-sm md:max-w-lg lg:max-w-xl">
      <h1 className="text-lg md:text-2xl  font-bold text-center mb-6 lg:text-3xl">
        Sign In
      </h1>

      <FormInput
        className="mb-4"
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        label="Email"
        onChange={setEmail}
      />
      <FormInput
        className="mb-6"
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
      />

      <Button
        onClick={handleSubmit}
        className="w-full py-2 text-white font-bold rounded-md sm:py-3 sm:text-base lg:py-3 lg:text-lg bg-blue-500 hover:bg-blue-700"
        label="  Sign In"
      />
      <p className="mt-4 text-center text-xs md:text-sm text-gray-600 lg:text-base">
        Don&apos;t have an account?{" "}
        <span
          onClick={toggleLogin}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

export default Login;
