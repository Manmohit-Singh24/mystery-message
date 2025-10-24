import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { Message } from "@/models/message.model";
import { APIResponse } from "@/lib/APIResponse";
import { NextRequest } from "next/server";
import { getMessagesPipeline } from "./pipelines";

export async function GET(req: NextRequest) {
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
			message: "No messages for guest user",
			data: {},
			status: 200,
		});
	}

	const role = req.nextUrl.searchParams.get("role");
	if (!role || (role !== "receiver" && role !== "sender")) {
		return APIResponse({
			success: false,
			message: "Invalid request",
			data: {},
			status: 400,
		});
	}

	const limit = 10;
	const cursor = req.nextUrl.searchParams.get("cursor");

	try {
		const foundUser = await User.findById(userId);

		if (!foundUser) {
			return APIResponse({
				success: false,
				message: "User not found",
				data: {},
				status: 404,
			});
		}

		const pipeline = getMessagesPipeline({
			role,
			userId: foundUser._id as string,
			cursor,
			limit: limit + 1, // fetching one extra to see if there’s more
		});

		const messages = await Message.aggregate(pipeline);

		let nextCursor = null;
		if (messages.length > limit) {
			messages.pop(); // removing that extra msg
			nextCursor = messages[messages.length - 1]._id;
		}

		return APIResponse({
			success: true,
			message: "User's messages fetched successfully",
			data: {
				messages,
				nextCursor,
			},
			status: 200,
		});
	} catch (error: any) {
		console.log("Failed to fetch user's messages :", error);

		return APIResponse({
			success: false,
			message: error.message || "Failed to fetch user's messages",
			data: {},
			status: 500,
		});
	}
}
