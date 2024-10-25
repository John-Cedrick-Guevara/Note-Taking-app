import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const noteId = searchParams.get("id");

  try {
    await prisma.note.delete({
      where: {
        noteId: parseInt(noteId as string),
      },
    });

    revalidatePath(`/dashboard/08d4caa7-709e-43f9-9af1-245e3bb16603`);
    console.log("reached");

    return NextResponse.json({ message: "Note deleted successfully!" });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting your note.",
      error: error,
    });
  }
}
