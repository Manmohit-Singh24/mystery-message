import { z } from "zod";
import { userPublicIdSchema } from "../validation/fields.js";

const getUserByIdSchema = z.object({
  id: userPublicIdSchema,
});

type GetUserByIdDto = z.infer<typeof getUserByIdSchema>;

type GetUserByIdResponse = {
  name: string;
  username: string;
  publicId: string;
};

export { getUserByIdSchema };
export type { GetUserByIdDto, GetUserByIdResponse };
