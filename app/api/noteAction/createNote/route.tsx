import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id, title, noteText } = body;


  await prisma.note.create({
    data: {
      userId: id,
      noteText: noteText,
      title: title,
    },
  });

  return NextResponse.json({ message: "Note created successfully" });
}
