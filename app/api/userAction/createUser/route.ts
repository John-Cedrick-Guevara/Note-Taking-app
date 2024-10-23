import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uName, password, email } = body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        email: email,
        userName: uName,
        password: hashedPassword,
        
      },
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "User created successfully" });
}
