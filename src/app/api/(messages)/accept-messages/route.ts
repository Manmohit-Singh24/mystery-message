import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { NextRequest } from "next/server";
import { APIResponse, safeUserResponse } from "@/lib/APIResponse";

export async function POST(req: NextRequest) {
	await dbConnect();

	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return APIResponse({
			success: false,
			message: "Not Authenticated",
			data: {},
			status: 401,
		});
	}
	const userId = session.user._id;

	if (userId === "guest") {
		return APIResponse({
			success: false,
			message: "Guest user cannot change message acceptance status",
			data: {},
			status: 401,
		});
	}

	const { acceptMessages } = await req.json();

	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ isAcceptingMessage: acceptMessages },
			{ new: true }
		);

		if (!updatedUser) {
			return APIResponse({
				success: false,
				message: "User not found",
				data: {},
				status: 404,
			});
		}

		return APIResponse({
			success: true,
			message: "Message acceptance status updated successfully",
			data: safeUserResponse(updatedUser),
			status: 200,
		});
	} catch (error) {
		console.log("Failed to update user status to accept messages");

		return APIResponse({
			success: false,
			message: "Failed to update user status to accept messages",
			data: {},
			status: 500,
		});
	}
}

export async function GET() {
	await dbConnect();

	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return APIResponse({
			success: false,
			message: "Not Authenticated",
			data: {},
			status: 401,
		});
	}

	const user = session.user;

	const userId = user._id;

	try {
		const foundedUser = await User.findById(userId);

		if (!foundedUser) {
			return APIResponse({
				success: false,
				message: "User not found",
				data: {},
				status: 404,
			});
		}

		return APIResponse({
			success: true,
			message: `User is${!foundedUser.isAcceptingMessage ? " not" : ""} accepting messages:`,
			data: safeUserResponse(foundedUser),
			status: 200,
		});
	} catch (error) {
		console.log("Failed to fetch user's status to accept messages");

		return APIResponse({
			success: false,
			message: "Failed to fetch user's status to accept messages",
			data: {},
			status: 500,
		});
	}
}
