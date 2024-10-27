import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" });
  }

  const { email, password } = await req.json();

  try {
    // Fetch user from the database
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, id: user.userId }, // Use user.id for payload
      secret,
      { expiresIn: "24h" }
    );

    // Set the token in a cookie (HttpOnly cookie for security)
    const response = NextResponse.json({
      message: "Log in successful",
      id: user.userId,
      data: user,
    });
    response.cookies.set("auth_token", token, {
      httpOnly: true, // Helps mitigate the risk of client side script accessing the token
      path: "/", // Cookie accessible on the entire site
      maxAge: 3600, // 1 hour
      sameSite: "strict", // Adjust this if you're having issues with cookies not being sent
    });

    return response; // Return the response with the cookie set
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
