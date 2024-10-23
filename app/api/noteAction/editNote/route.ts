import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { noteId, title, noteText } = body;

    await prisma.note.update({
      where: {
        noteId: noteId,
      },
      data: {
        title: title,
        noteText: noteText,
      },
    });

    return NextResponse.json({ message: "Note Updated" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update note" },
      { status: 500 }
    );
  }
}
