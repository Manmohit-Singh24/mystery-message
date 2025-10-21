"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user.username} <br />
				<button className="pd-5 rounded-xl border bg-red-200/30 "  onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button
				className="p-2 rounded-lg border bg-red-200/30"
				onClick={() => signIn()}
			>
				Sign in
			</button>
		</>
	);
}
