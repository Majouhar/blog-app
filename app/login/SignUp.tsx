import React from "react";

const SignUp = ({ toggleLogin }: Readonly<{ toggleLogin: () => void }>) => {
  return (
    <div className="max-w-lg mx-auto my-12 p-6 rounded-2xl shadow-lg bg-white sm:my-8 sm:p-4 md:my-10 md:p-5">
      <h1 className="text-2xl font-bold text-center mb-6 sm:text-xl md:text-2xl">
        Sign Up
      </h1>

      {/* Name Input */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 md:p-3"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 md:p-3"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 md:p-3"
        />
      </div>

      {/* Confirm Password Input */}
      <div className="mb-6">
        <label
          htmlFor="confirm-password"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:p-2 md:p-3"
        />
      </div>

      {/* Sign Up Button */}
      <button className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition sm:py-2 md:py-3">
        Sign Up
      </button>

      {/* Footer Text */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={toggleLogin}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default SignUp;
