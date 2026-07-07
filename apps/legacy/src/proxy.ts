import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function proxy(req: NextRequest) {
	const token = await getToken({ req });
	const url = req.nextUrl;

    if(!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

	if (
		token &&
		(url.pathname.startsWith("/login") ||
			url.pathname.startsWith("/register") ||
			url.pathname.startsWith("/verify"))
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/", "/dashboard/:path", "/verify/:path*"],
};
