import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { ADD_USER } from "@/graphql/queries/userQueries";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Button from "../components/Button";

const SignUp = ({ toggleLogin }: Readonly<{ toggleLogin: () => void }>) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const [addUser, { loading: addLoading }] = useMutation(ADD_USER, {
    onCompleted() {
      toggleLogin();
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  const handleSignUp = () => {
    // Allowing spaces in passwords
    if (name.trim().length < 3) {
      toast.error("Enter a Valid Name");
    } else if (password.length < 8) {
      toast.error("Password should be minimum 8 characters");
    } else if (password != cnfPassword) {
      toast.error("Passwords are not matching");
    } else {
      addUser({
        variables: {
          user: {
            name,
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto   rounded-2xl shadow-lg bg-white  sm:p-4  md:p-5">
        <h1 className="text-lg md:text-2xl font-bold text-center  sm:text-xl md:text-2xl mb-4">
          Sign Up
        </h1>

        <FormInput
          label="Full Name"
          id="name"
          type="text"
          placeholder="Enter your full name"
          className="mb-4"
          onChange={setName}
          value={name}
        />
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          className="mb-4"
          onChange={setEmail}
          value={email}
        />

        <FormInput
          className="mb-4"
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
        />

        <FormInput
          className="mb-6"
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          value={cnfPassword}
          label="Confirm Password"
          onChange={setCnfPassword}
        />

        <Button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white py-3 rounded-lg  font-bold hover:bg-blue-600 transition sm:py-2 md:py-3"
          label="  Sign Up"
        />

        <p className="mt-6 text-center text-xs md:text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={toggleLogin}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
      {addLoading && <Loader />}
    </>
  );
};

export default SignUp;
