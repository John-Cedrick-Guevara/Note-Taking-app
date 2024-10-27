"use client";
import prisma from "@/lib/db";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";

interface note {
  noteId: number;
  noteText: string;
  title: string;
  userId: string;
}

const notePage = ({ params }: { params: { noteID: string } }) => {
  const router = useRouter();
  const [noteData, setNoteData] = useState<note | null>(null);

  useEffect(() => {
    async function fetchNote() {
      const dataNote = await axios.get(
        `/api/noteAction/fetchNote`, {params : {userId : params.noteID}}
      );

      return setNoteData(dataNote.data.data);
    } 
    fetchNote();
  }, [params.noteID]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await axios.put("/api/noteAction/editNote", {
      noteId: noteData?.noteId,
      title: noteData?.title,
      noteText: noteData?.noteText,
    });

    router.push(`/dashboard`);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* title field */}
        <input
          type="text"
          placeholder="Title"
          className="input input-ghost w-full max-w-xs text-xl"
          name="title"
          value={noteData?.title || ""}
          onChange={(e) =>
            setNoteData((prev) =>
              prev ? { ...prev, title: e.target.value } : null
            )
          }
        />

        {/* text field */}
        <SimpleMDE
          value={noteData?.noteText || ""}
          onChange={(e) =>
            setNoteData((prev) => (prev ? { ...prev, noteText: e } : null))
          }
        />

        <button className="btn btn-warning">Save</button>
      </form>
    </div>
  );
};

export default notePage;
