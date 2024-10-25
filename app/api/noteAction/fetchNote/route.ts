import prisma from "@/lib/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const noteData = await prisma.note.findMany({
      where: {
        noteId: parseInt(userId as string),
      },
    });

    return NextResponse.json({ message: "Note found", data: noteData[0] });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error: error });
  }
}
