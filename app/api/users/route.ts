import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {

  const {searchParams} =  new URL(req.url)

  const id  = searchParams.get("userId")

  // Validate the user ID
  if (!id) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.note.findMany({
      where: { userId: id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
