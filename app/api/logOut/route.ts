import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Remove the 'auth_token' cookie by setting maxAge to 0
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, // Set to 0 to delete the cookie
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Error logging out", error: error });
  }
}
