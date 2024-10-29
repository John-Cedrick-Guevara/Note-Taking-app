"use client";
import Error from "@/Components/Error";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const signUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      password === "" ||
      userName === "" ||
      passwordVal === "" ||
      userName === ""
    ) {
      setError("All should be answered.");
    } else if (password.length < 8) {
      setError("Password must be 8 characters.");
    } else if (password !== passwordVal) {
      setError("Please type the same password");
    } else {
      await axios.post("/api/userAction/createUser", {
        email: email,
        password: password,
        uname: userName,
      });

      setEmail("");
      setUserName("");
      setPasswordVal("");
      setPassword("");

      router.push("/");
    }
  }

  return (
    <form className="p-5 max-w-2xl mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-3xl text-white font-semibold flex flex-col ">
        Sign Up
      </h1>
      <Error message={error} />
      {/* email field */}

      <section className="mt-20 flex flex-col items-center justify-center mx-auto gap-5">
        <div className="inputField w-full">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="input input-bordered input-secondary w-full "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* password field */}
        <div className="inputField w-full">
          <label htmlFor="psd">Password:</label>

          <input
            name="psd"
            type="password"
            placeholder="Password"
            className="input input-bordered input-secondary w-full "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inputField w-full">
          <label htmlFor="psd2">Confirm password:</label>

          <input
            name="psd2"
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered input-secondary w-full "
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
        </div>

        <div className="inputField w-full">
          <label htmlFor="username">Set your username:</label>

          <input
            name="userName"
            type="text"
            placeholder="Productive Person "
            className="input input-bordered input-secondary w-full "
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button className="btn btn-outline btn-info w-fit">Submit</button>
      </section>
    </form>
  );
};

export default signUp;
