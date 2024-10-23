import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key"); // Use TextEncoder for the secret

export async function middleware(req: NextRequest) {
    console.log('Middleware triggered for path:', req.nextUrl.pathname);

    const token = req.cookies.get("auth_token")?.value;
    console.log('Token value:', token); // Log token value

    if (!token) {
        console.log('No token found, redirecting to login');
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const { payload } = await jwtVerify(token, secret);
        console.log('Token is valid, decoded:', payload);
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.redirect(new URL("/logIn", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
