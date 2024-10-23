import prisma from "@/lib/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  const { noteId } = params;
  console.log(parseInt(noteId));

  try {
    const noteData = await prisma.note.findMany({
      where: {
        noteId: parseInt(noteId),
      },
    });

    return NextResponse.json({ message: "Note found", data: noteData[0] });
  } catch (error) {
    return NextResponse.json({ message: "Server error" , error : error});
  }
}
