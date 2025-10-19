import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
	name: string;
	username: string;
	email: string;
	password: string;

	isVerified: boolean;
	verificationCode: string;
	verificationCodeExpiry: Date;

	isAcceptingMessage: boolean;

	createdAt: Date;
	updatedAt: Date;
}

const userSchema: Schema<User> = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	username: {
		type: String,
		required: [true, "Username is required"],
		unique: [true, "Username already exists"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: [true, "Email already exists"],
		match: [/.+@.+\..+/, "Please enter a valid email address"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	verificationCode: {
		type: String,
	},
	verificationCodeExpiry: {
		type: Date,
	},
	isAcceptingMessage: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

export const User =
	(mongoose.models.User as mongoose.Model<User>) ||
	mongoose.model<User>("User", userSchema);
