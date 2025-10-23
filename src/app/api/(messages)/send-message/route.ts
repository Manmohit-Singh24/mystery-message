import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import { Message } from "@/models/message.model";
import { NextRequest } from "next/server";
import { APIResponse } from "@/lib/APIResponse";

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
	const {
		content,
		receiver,
		isAnonymous = false,
		isTruelyAnonymous = false,
	} = await req.json();

	if (!receiver || receiver === userId) {
		return APIResponse({
			success: false,
			message: "Invalid request",
			data: {},
			status: 400,
		});
	}

	if (!content || content.length < 10 || content.length > 500) {
		return APIResponse({
			success: false,
			message: "Invalid message content",
			data: {},
			status: 400,
		});
	}

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

		const foundReceiver = await User.findById(receiver);
		if (!foundReceiver) {
			return APIResponse({
				success: false,
				message: "Receiver not found",
				data: {},
				status: 404,
			});
		}
		if (!foundReceiver.isAcceptingMessage) {
			return APIResponse({
				success: false,
				message: "Receiver is not accepting messages",
				data: {},
				status: 400,
			});
		}

		const message = new Message({
			content,
			sender: isTruelyAnonymous ? null : foundUser._id,
			receiver: foundReceiver._id,
			isAnonymous : isTruelyAnonymous || isAnonymous, // should be true too if msg is truely anonymous
			isTruelyAnonymous,
			createdAt: new Date(),
		});

		if (!(await message.save())) {
			return APIResponse({
				success: false,
				message: "Failed to send message",
				data: {},
				status: 500,
			});
		}

		return APIResponse({
			success: true,
			message: "Message sent successfully",
			data: {},
			status: 200,
		});
	} catch (error: any) {
		console.log("Failed to send message", error);

		return APIResponse({
			success: false,
			message: error.message || "Failed to send message",
			data: {},
			status: 500,
		});
	}
}
