import { createHash, randomBytes } from "node:crypto";

const DEFAULT_TOKEN_LENGTH = 32;

const generateSecureToken = (bytes: number = DEFAULT_TOKEN_LENGTH) => {
  return randomBytes(bytes).toString("base64url");
};

const hashToken = (token: string) => {
  return createHash("sha256").update(token).digest("hex");
};

const verifyToken = (token: string, hash: string) => {
  return hashToken(token) === hash;
};

export { generateSecureToken, hashToken, verifyToken };
