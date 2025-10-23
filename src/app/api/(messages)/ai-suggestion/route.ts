import { google } from "@ai-sdk/google";
import { streamText, generateText } from "ai";
import { APIResponse } from "@/lib/APIResponse";

export const runtime = "edge";

export const maxDuration = 30;

const model = google("gemini-2.5-flash-lite");

const systemPrompts: { [key: string]: string } = {
	fun_compliment:
		"Write a short, fun, and friendly compliment like an expert giving encouragement. Keep it cheerful, creative, and playful.",

	witty_roast:
		"Write a short, clever, and sharp roast like an experienced comedian. Make it funny, bold, and memorable.",

	serious_feedback:
		"Give clear and professional feedback on an idea or work like an expert reviewer. Focus on improvements and actionable points.",

	parse_message:
		"Rewrite the user’s message clearly and concisely. Keep the main idea and make it easy to read.",

	motivational_message:
		"Write a short, inspiring, and uplifting message that motivates someone. Keep it positive and easy to understand.",

	joke: "Write a short, funny joke or pun. Keep it clever.",

	short_story:
		"Write a very short story or scene that is engaging and imaginative. Be creative.",

	casual_conversation:
		"Write a short, natural, and friendly conversational message. Make it sound like casual human chat.",

	romantic_message:
		"Write a short, warm, and heartfelt romantic message or confession. Make it sweet and sincere.",

	default: "Write short, simple, and positive messages.",
};

export async function POST(req: Request) {
	try {
		const {
			prompt: message,
			type,
		}: { prompt: string; type: keyof typeof systemPrompts } = await req.json();

		if (!message || typeof message !== "string") {
			return APIResponse({
				success: false,
				message: "Invalid or missing prompt.",
				data: {},
				status: 400,
			});
		}

		const msgTrimmed = message.trim();
		if (msgTrimmed.length > 300 || msgTrimmed.length < 10) {
			return APIResponse({
				success: false,
				message: "Your input is too long. Please shorten your idea.",
				data: {},
				status: 400,
			});
		}
		const prompt = `${msgTrimmed}. Avoid complex words.`;

		const systemPromptKey = type && type in systemPrompts ? type : "default";

		const result = streamText({
			model,
			system: systemPrompts[systemPromptKey],
			prompt: prompt,
			maxOutputTokens: 200,
			temperature: 0.7,
		});

		return result.toUIMessageStreamResponse();
		// return APIResponse({
		//     success: true,
		//     message: "Success",
		//     data: result,
		//     status: 200
		// })
	} catch (error) {
		console.error("AI Endpoint Error:", error);
		return APIResponse({
			success: false,
			message: "A server error occurred during AI generation.",
			data: {},
			status: 500,
		});
	}
}
