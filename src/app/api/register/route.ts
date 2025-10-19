import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { User } from "@/models/user.model";
import connectDB from "@/lib/dbConnect";
import { APIResponse, safeUserResponse } from "@/lib/APIResponse";
import { registerSchema } from "@/schemas/auth.schema";
import { sendVerificationEmail } from "@/lib/sendVerificationEmail";
import { generateCode } from "@/lib/generateCode";
export async function POST(request: NextRequest) {
	// connecting to db
	await connectDB();

	try {
		const body = await request.json();
		const { name, username, email, password } = body;

		// validate received data
		const validateRes = registerSchema.safeParse(body);
		if (!validateRes.success) {
			const data = JSON.parse(validateRes.error.message)[0];
			return APIResponse({
				success: false,
				message: data.message || "Error registering user",
				data: data,
				status: 400,
			});
		}

		// check if a User with this email already exists
		const existingUserByEmail = await User.findOne({ email });
		if (existingUserByEmail) {
			// check if a verified user with this email already exists
			if (existingUserByEmail.isVerified) {
				return APIResponse({
					success: false,
					message:
						"User with this email already exists, please login or use another email",
					data: { email },
					status: 400,
				});
			}

			// so user exists but is unverified
			// check if the verification code has expired
			if (existingUserByEmail.verificationCodeExpiry < new Date()) {
				// the user can't verify his email now
				// just delete that user to free the email
				await User.deleteOne({ _id: existingUserByEmail._id });
			} else {
				return APIResponse({
					success: false,
					message:
						"A user with this email is already registered, please check your email to verify your account",
					data: { email },
					status: 400,
				});
			}
		}

		// check if a verified user with this username already exists
		const existingUserByUsername = await User.findOne({ username });
		if (existingUserByUsername) {
			if (
				!existingUserByUsername.isVerified &&
				existingUserByUsername.verificationCodeExpiry < new Date()
			) {
				// an unverified User with this username already exists
				// and the verification code has expired
				// just delete that user to free the username
				await User.deleteOne({ _id: existingUserByUsername?._id });
			} else {
				return APIResponse({
					success: false,
					message: "User with this username already exists",
					data: { username },
					status: 400,
				});
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationCode = generateCode(6);
		const verificationCodeExpiry = new Date(Date.now() + 60 * 60 * 1000);

		const user = new User({
			name,
			username,
			email,
			password: hashedPassword,
			verificationCode,
			verificationCodeExpiry,
		});
		const userDB = await user.save();

		if (!userDB) {
			return APIResponse({
				success: false,
				message: "Error registering user",
				data: {},
				status: 500,
			});
		}

		// sending verification email
		const emailRes = await sendVerificationEmail(
			userDB,
			userDB.verificationCode
		);
		if (!emailRes.ok) {
			return APIResponse({
				success: false,
				message: "Error sending verification email",
				data: emailRes,
				status: emailRes.status,
			});
		}

		return APIResponse({
			success: true,
			message: "User registered successfully",
			data: safeUserResponse(userDB),
			status: 200,
		});
	} catch (error: any) {
		console.log("Error registering user", error);

		return APIResponse({
			success: false,
			message: "Internal Error ",
			data: { error },
			status: 500,
		});
	}
}
