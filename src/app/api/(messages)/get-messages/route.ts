import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { Message } from "@/models/message.model";
import { APIResponse } from "@/lib/APIResponse";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface projectType {
	_id: number;
	content: number;
	createdAt: number;
	sender?: object;
	receiver?: object;
	isAnonymous?: number;
	// anotherUserData?: number;
}

interface lookupType {
	from: string;
	localField?: string;
	foreignField: string;
	as: string;
}

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

	const limit = 5;
	const cursor = req.nextUrl.searchParams.get("cursor");

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

		const match = { [role]: foundUser._id };
		if (cursor) {
			match._id = { $lt: new mongoose.Types.ObjectId(cursor) };
		}

		const lookup: lookupType = {
			from: "users",
			foreignField: "_id",
			as: "anotherUserData",
		};

		const project: projectType = {
			_id: 1,
			content: 1,
			createdAt: 1,
		};

		if (role === "receiver") {
			lookup.localField = "sender";
			project.sender = {
				$cond: {
					if: { $eq: ["$isAnonymous", true] },
					then: {
						_id: null,
						username: "Anonymous",
						name: "Anonymous",
					},
					else: {
						_id: "$sender",
						username: {
							$ifNull: ["$anotherUserData.username", "User Deleted"],
						},
						name: {
							$ifNull: ["$anotherUserData.name", "User Deleted"],
						},
					},
				},
			};
		} else {
			lookup.localField = "receiver";
			project.receiver = {
				_id: "$receiver",
				username: {
					$ifNull: ["$anotherUserData.username", "User Deleted"],
				},
				name: {
					$ifNull: ["$anotherUserData.name", "User Deleted"],
				},
			};
		}

		const messages = await Message.aggregate([
			{ $match: match },
			{ $sort: { createdAt: -1 } },
			{ $limit: limit + 1 }, // fetch one extra to see if there’s more
			{ $lookup: lookup },
			{
				$unwind: { path: "$anotherUserData", preserveNullAndEmptyArrays: true }, // convert array to single object
			},
			{ $project: project },
		]);

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
