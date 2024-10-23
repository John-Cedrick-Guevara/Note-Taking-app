import prisma from "@/lib/db";
import { NextApiRequest } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {

  const { userId } = req.body;
  console.log(userId);
  
  const { id } = params;

  try {
    await prisma.note.delete({
      where: {
        noteId: parseInt(id as string),
      },
    });
    revalidatePath(`dashboard/${userId}`);

    return NextResponse.json({ message: "Note deleted successfully!" });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting your note.",
      error: error,
    });
  }
}
