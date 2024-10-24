"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface user {
  id: number;
  email: string;
  password: string;
  userName: string;
}

const signUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("psd"),
    };

    const res = await axios.post("/api/auth", data);
    console.log(res.data.id);

    if (!res.data.message) {
      return;
    }

    router.push(`/dashboard/${res.data.id}` );
  }

  return (
    <form className="p-5 " onSubmit={handleSubmit}>
      {/* email field */}
      <h1 className="text-3xl text-white font-semibold flex flex-col ">
        Log In
      </h1>

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

        <button className="btn btn-outline btn-info w-fit">Submit</button>
      </section>
    </form>
  );
};

export default signUp;
