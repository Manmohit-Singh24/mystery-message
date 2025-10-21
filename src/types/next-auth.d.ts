import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		_id?: string;
		name?: string;
		username?: string;
		email?: string;
		// password?: string;
		isVerified?: boolean;
		isAcceptingMessage?: boolean;
	}

	interface Session {
		user: {
			_id?: string;
			email?: string;
			username?: string;
			name?: string;
			isVerified?: boolean;
			isAcceptingMessage?: boolean;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		_id?: string;
		email?: string;
		username?: string;
		name?: string;
		isVerified?: boolean;
		isAcceptingMessage?: boolean;
	}
}
