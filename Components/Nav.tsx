"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CgProfile } from "react-icons/cg";

interface search {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Nav = ({ search, setSearch }: search) => {
  const router = useRouter();

  function handleLogOut() {
    try {
      axios.post("/api/logOut");
      router.push("/");
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1 ">
        <span className="btn btn-ghost text-xl text-white ">
          <Link href={"/dashboard/"}>DashBoard</Link>
        </span>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <CgProfile size={30} />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <Link href={"/updateProfile"}>
            <span className="justify-between">Update Profile</span>
          </Link>

          <li onClick={handleLogOut}>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
