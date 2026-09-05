import { z } from "zod";
import { userPublicIdSchema } from "../validation/fields.js";

const getUserByIdSchema = z.object({
  id: z.cuid2(),
});

type GetUserByIdDto = z.infer<typeof getUserByIdSchema>;

const getUserByPublicIdSchema = z.object({
  id: userPublicIdSchema,
});

type GetUserByPublicIdDto = z.infer<typeof getUserByPublicIdSchema>;

type GetUserResponse = {
  name: string;
  username: string;
  publicId: string;
};

export { getUserByPublicIdSchema, getUserByIdSchema };
export type { GetUserByPublicIdDto, GetUserByIdDto, GetUserResponse };
