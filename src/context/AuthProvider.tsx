"use client";
import { SessionProvider } from "next-auth/react";

// NextAuth session provider
// Can't directly implement in layout.tsx as it's a client component.

export default function AuthProvider({ children }: any) {
	return <SessionProvider>{children}</SessionProvider>;
}
