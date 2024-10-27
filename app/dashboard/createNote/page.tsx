"use client";
import React, { useState } from "react";
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useData } from "@/app/DataProvider";

const createNote = () => {
  const [noteText, setNoteText] = useState("");
  const { userId } = useData();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    axios.post("/api/noteAction/createNote", {
      title: formData.get("title"),
      noteText: noteText,
      id: userId,
    });
    router.push(`/dashboard`);
  }

  return (
    <main className="p-12">
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* title field */}
        <input
          type="text"
          placeholder="Title"
          className="input input-ghost w-full max-w-xs text-xl"
          name="title"
        />

        {/* text field */}
        <SimpleMDE value={noteText} onChange={(e) => setNoteText(e)} />

        <button className="btn btn-warning">Save</button>
      </form>
    </main>
  );
};

export default createNote;
