import { APIResponse, safeUserResponse } from "@/lib/APIResponse";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextRequest } from "next/server";
import { verificationCodeSchema } from "@/schemas/auth.schema";

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const { userId, code } = await req.json();

		const validateRes = verificationCodeSchema.safeParse(code);
		if (!validateRes.success) {
			const data = JSON.parse(validateRes.error.message)[0];
			return APIResponse({
				success: false,
				message: data.message || "Invalid code format",
				data: data,
				status: 400,
			});
		}
		const user = await User.findById({ _id: userId });
		if (!user) {
			return APIResponse({
				success: false,
				message:
					"Account not found , seems like you are either not registered or had been late in verifying your account",
				data: {},
				status: 404,
			});
		}

		if (user.verificationCodeExpiry < new Date()) {
			return APIResponse({
				success: false,
				message: "Verification code expired",
				data: {},
				status: 400,
			});
		}

		if (user.verificationCode !== code) {
			return APIResponse({
				success: false,
				message: "Incorrect verification code",
				data: safeUserResponse(user),
				status: 400,
			});
		}

		user.isVerified = true;
		user.verificationCode = "";
		user.verificationCodeExpiry = new Date();
		await user.save();

		return APIResponse({
			success: true,
			message: "User verified successfully",
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
