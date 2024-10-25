"use client";
import prisma from "@/lib/db";
import axios from "axios";
import { revalidatePath } from "next/cache";
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

const dashboardPage = ({ params }: { params: { id: string } }) => {
  const [notes, setNotes] = useState<note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const router = useRouter();
  const [showmessage, setShowMessage] = useState(false);
  useEffect(() => {
    // Fetch user data based on params.id

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users`, {
          params: { userId: params.id },
        });
        setNotes(res.data.user);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user data."); // Update error state
      } finally {
        setIsLoading(false); // Set loading to false in both success and error cases
      }
    };

    fetchUser();
  }, [showmessage]);

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

  return (
    <main className="p-10 flex flex-col gap-4 items-center justify-center">
      {showmessage && <h1>Note Deleted</h1>}
      {notes?.map((note, key) => (
        <div
          key={key}
          className="cursor-pointer border rounded-md p-5 w-full flex items-center justify-between"
        >
          <Link href={`/dashboard/${note.userId}/${note.noteId}}`}>
            <h1 className=" text-2xl font-semibold">{note.title}</h1>
            <p>{note.noteText}</p>
          </Link>
          <div>
            <MdDelete size={30} onClick={() => handleDelete(note.noteId)} />
          </div>
        </div>
      ))}

      <Link href={`/dashboard/${params.id}/createNote`}>
        <IoAddCircleSharp
          className="cursor-pointer fixed bottom-10 right-10"
          size={60}
        />
      </Link>
    </main>
  );
};

export default dashboardPage;
