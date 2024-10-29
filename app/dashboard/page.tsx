"use client";
import { useData } from "@/app/DataProvider";
import Nav from "@/Components/Nav";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface note {
  noteId: number;
  noteText: string;
  title: string;
  userId: string;
}

const dashboardPage = () => {
  const [notes, setNotes] = useState<note[]>([]);
  const [showmessage, setShowMessage] = useState(false);
  const [search, setSearch] = useState("");
  const { userId } = useData();

  useEffect(() => {
    // Fetch user data based on params.id

    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`/api/users`, {
          params: { userId: userId },
        });
        setNotes(res.data.user);
      } catch (error) {
        console.error(error);
       
      }
    };

    fetchUser();
  }, [showmessage, userId]);

  function handleDelete(id: number) {
    axios
      .delete(`/api/noteAction/deleteNote`, {
        params: { id: id },
      })

      .then((response) => {
        console.log("Note deleted successfully", response.data);
        setShowMessage(true);

        const timer = setTimeout(() => {
          setShowMessage(false);
        }, 2000);

        return () => clearTimeout(timer);
      })
      .catch((error) => {
        console.error("Error deleting the note", error);
      });
  }

  console.log(search);

  return (
    <main className=" flex flex-col gap-4 items-center justify-center">
      <Nav search={search} setSearch={setSearch} />

      {showmessage && <h1>Note Deleted</h1>}
      <section className="flex flex-wrap gap-3 w-full mt-10 p-10">
        {notes
          ?.filter((item) => (item.title.includes(search) ? item : null))
          .map((note, key) => (
            <div
              key={key}
              className="cursor-pointer border rounded-md p-3 w-full  md:max-w-sm mx-auto"
            >
              <Link href={`/dashboard/${note.noteId}}`}>
                <h1 className=" text-2xl font-semibold">{note.title}</h1>
                <p>{note.noteText}</p>
              </Link>
              <div className="block w-fit ml-auto">
                <MdDelete size={30} onClick={() => handleDelete(note.noteId)} />
              </div>
            </div>
          ))}

        <div className="absolute bottom-10 right-10">
          <Link href={`/dashboard/createNote`}>
            <IoAddCircleSharp size={50} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default dashboardPage;
