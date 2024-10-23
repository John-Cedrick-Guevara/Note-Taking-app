"use client";
import React, { useState } from "react";
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const createNote = ({ params }: { params: { id: string } }) => {
  const [noteText, setNoteText] = useState("");
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      title: formData.get("title"),
      noteText: noteText,
      id: params.id,
    };

    axios.post("/api/noteAction/createNote", data);
    router.push(`/dashboard/${params.id}`)
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
