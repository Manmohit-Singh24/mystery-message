import z from "zod";

/* Zod Validation Schema for Message */

export const messageSchema = z.object({
	content: z
		.string()
		.min(10, "Message must be at least 10 characters long")
		.max(500, "Message must be at most 500 characters long"),
	sender: z.string(),
	receiver: z.string(),
	createdAt: z.date(),
});
