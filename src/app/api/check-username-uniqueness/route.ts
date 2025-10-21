import { APIResponse } from "@/lib/APIResponse";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { usernameValidation } from "@/schemas/auth.schema";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	await dbConnect();

	try {
		const { searchParams } = new URL(req.url);
		const username = searchParams.get("username");
		// validate received data
		const validateRes = usernameValidation.safeParse(username);

		if (!validateRes.success) {
			const data = JSON.parse(validateRes.error.message)[0];
			return APIResponse({
				success: false,
				message: data.message || "Invalid username format",
				data: {},
				status: 400,
			});
		}

		// check if a User with this email already exists
		const existingUserByUsername = await User.findOne({ username });
		if (
			existingUserByUsername && // username exists
			(existingUserByUsername.isVerified || // is verified
				existingUserByUsername.verificationCodeExpiry > new Date()) // or still has time to be verified.
		) {
			return APIResponse({
				success: false,
				message: "Username already exists",
				data: {},
				status: 400,
			});
		}

		return APIResponse({
			success: true,
			message: "Username is available",
			data: {},
			status: 200,
		});
	} catch (error: any) {
		return APIResponse({
			success: false,
			message: error.message || "Internal Error",
			data: { error },
			status: 500,
		});
	}
}
