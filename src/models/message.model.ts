import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
	content: string;
	sender?: mongoose.Schema.Types.ObjectId ;
    receiver: mongoose.Schema.Types.ObjectId;
    isAnonymous: boolean;
    isTrulyAnonymous: boolean;
	createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
	content: {
		type: String,
		required: true,
	},
	sender: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User",
        required: false,
    },
	receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
		required: true,
    },
    isAnonymous: {
        type: Boolean,
        default: false,
    },
    isTrulyAnonymous: {
        type: Boolean,
        default: false,
    },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export const Message =
	(mongoose.models.Message as mongoose.Model<Message>) ||
	mongoose.model<Message>("Message", MessageSchema);
