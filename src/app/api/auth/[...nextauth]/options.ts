import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any, req): Promise<any> {
				await dbConnect();

				try {
					const { identifier, password } = credentials;
					const user = await User.findOne({
						$or: [{ email: identifier }, { username: identifier }],
					});

					if (!user) {
						throw new Error("Invalid email or password");
					}

					if (!user.isVerified) {
						throw new Error("Please verify your account to login");
					}

					const isPasswordValid = await bcrypt.compare(password, user.password);
					if (!isPasswordValid) {
						throw new Error("Invalid email or password");
					}
					return user;
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id?.toString();
				token.email = user.email;
				token.username = user.username;
				token.name = user.name;
				token.isAcceptingMessage = user.isAcceptingMessage;
				token.isVerified = user.isVerified;
			}
			return token;
		},
		async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessage;
                session.user.username = token.username;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
