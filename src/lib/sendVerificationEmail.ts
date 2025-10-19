import { Resend } from "resend";
import { VerificationEmailTemplate } from "@/components/VerifyEmailTemplate";
import { APIResponse } from "./APIResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(user: { email : string; name: string }, code: string) {
	try {
		const { data, error } = await resend.emails.send({
			from: "Mystery Message <manmohit@resend.dev>",
			to: [user.email],
			subject: "Verify your account",
			react: VerificationEmailTemplate({
				name: user.name,
				validationCode: code,
			}),
		});

		if (error) {
			return APIResponse({
				success: false,
				message: "Error sending verification email",
				data: error,
				status: 500,
			});
		}

		return APIResponse({
			success: true,
			message: "Verification email sent successfully",
			data,
			status: 200,
		});
	} catch (error) {
		return APIResponse({
			success: false,
			message: "Error sending verification email",
			data: { error },
			status: 500,
		});
	}
}
