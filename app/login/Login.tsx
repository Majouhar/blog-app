import { signIn } from "next-auth/react";
import router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login({ toggleLogin }: Readonly<{ toggleLogin: () => void }>) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
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

  return (
    <div className="max-w-sm mx-auto my-12 p-6 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

      {/* Email Input */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 text-white font-bold rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Footer Text */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
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
