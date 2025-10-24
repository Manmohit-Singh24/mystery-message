import mongoose, { PipelineStage } from "mongoose";

const receiverPipelineConfig = {
	$lookup: {
		from: "users",
		let: {
			senderId: "$sender",
			isAnonymous: "$isAnonymous",
		},
		pipeline: [
			{
				$match: {
					$expr: {
						$and: [
							{ $eq: ["$$isAnonymous", false] }, // Only make a lookup if msg is non-anonymous
							{ $eq: ["$_id", "$$senderId"] },
						],
					},
				},
			},
		],
		as: "anotherUserData",
	},

	$project: {
		_id: 1,
		content: 1,
		createdAt: 1,
		isAnonymous: 1,
		isTrulyAnonymous: 1,
		sender: {
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
		},
	},
};

const senderPipelineConfig = {
	$lookup: {
		from: "users",
		localField: "receiver",
		foreignField: "_id",
		as: "anotherUserData",
	},

	$project: {
		_id: 1,
		content: 1,
		createdAt: 1,
		isAnonymous: 1,
		isTrulyAnonymous: 1,
		receiver: {
			_id: "$receiver",
			username: {
				$ifNull: ["$anotherUserData.username", "User Deleted"],
			},
			name: {
				$ifNull: ["$anotherUserData.name", "User Deleted"],
			},
		},
	},
};

export function getMessagesPipeline({
	role,
	userId,
	cursor,
	limit,
}: {
	role: string;
	userId: string;
	cursor: string | null;
	limit: number;
}): PipelineStage[] {
	const $match: any = {
		[role]: new mongoose.Types.ObjectId(userId),
	};
	if (cursor) $match._id = { $lt: new mongoose.Types.ObjectId(cursor) };

	const { $lookup, $project } =
		role === "receiver" ? receiverPipelineConfig : senderPipelineConfig;

	const pipeline: PipelineStage[] = [
		{ $match },
		{ $sort: { createdAt: -1 } },
		{ $limit: limit },
		{ $lookup },
		{ $unwind: { path: "$anotherUserData", preserveNullAndEmptyArrays: true } },
		{ $project },
	];

	return pipeline;
}
