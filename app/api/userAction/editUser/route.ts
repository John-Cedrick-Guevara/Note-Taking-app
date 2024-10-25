import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, newEmail, password, uname } = body;
  const hashedPassword  = await bcrypt.hash(password, 10)

  try {
    await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        email: newEmail,
        password: hashedPassword,
        userName: uname,
      },
    });

    return NextResponse.json({ message: "profile updated" });
  } catch (error) {
    return NextResponse.json({
      message: "error updating your credentials",
      error: error,
    });
  }
}
