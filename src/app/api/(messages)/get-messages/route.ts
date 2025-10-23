import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { Message } from "@/models/message.model";
import { APIResponse } from "@/lib/APIResponse";
import { NextRequest } from "next/server";

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
	const user = session.user;

	const role = req.nextUrl.searchParams.get("role");
	if (!role || (role !== "receiver" && role !== "sender")) {
		return APIResponse({
			success: false,
			message: "Invalid request",
			data: {},
			status: 400,
		});
	}
	try {
		const foundUser = await User.findById(user._id);

		if (!foundUser) {
			return APIResponse({
				success: false,
				message: "User not found",
				data: {},
				status: 404,
			});
		}

		const messages = await Message.aggregate([
			{ $match: { [role]: foundUser._id } },
			{ $sort: { createdAt: 1 } },
			{
				$lookup: {
					from: "users",
					localField: "sender",
					foreignField: "_id",
					as: "senderUsername", // will return an array of users
				},
			},
			{
				$unwind: "$senderUsername", // convert array to single object
			},
			{
				$project: {
					_id: 1,
					content: 1,
					createdAt: 1,
					sender: {
						$cond: {
							if: { $eq: ["$isAnonymous", true] },
							then: "Anonymous",
							else: "$sender",
						},
					},
					senderUsername: {
						$cond: {
							if: { $eq: ["$isAnonymous", true] },
							then: "Anonymous",
							else: "$senderUsername.username",
						},
					},
				},
			},
		]);

		return APIResponse({
			success: true,
			message: "User's messages fetched successfully",
			data: {
				messages,
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
