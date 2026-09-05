import jwt from "jsonwebtoken";

import { env } from "@/config/env.js";
import z from "zod";
import { UnauthorizedError } from "@/shared/errors/index.js";

const AccessTokenSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
});

type AccessTokenPayload = z.infer<typeof AccessTokenSchema>;

const generateAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    algorithm: "HS256",
  });
};

const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET, { algorithms: ["HS256"] });
    return AccessTokenSchema.parse(decoded);
  } catch {
    throw new UnauthorizedError();
  }
};

export { type AccessTokenPayload, generateAccessToken, verifyAccessToken };
