import ms from "ms";

import { redis } from "@/shared/redis.js";
import { NotFoundError, BadRequestError } from "@/shared/errors/index.js";

const EMAIL_CHANGE_VERIFY_TTL = ms("5min");

const userKey = (userId: string) => `email-change:verification:user:${userId}`;
const challengeKey = (challengeHash: string) =>
  `email-change:verification:challenge:${challengeHash}`;

const storeEmailChangeVerifyChallenge = async (
  challengeId: string,
  data: { otpHash: string; userId: string; newEmail: string }
) => {
  await redis
    .multi()
    .set(userKey(data.userId), challengeId, { PX: EMAIL_CHANGE_VERIFY_TTL })
    .hSet(challengeKey(challengeId), data)
    .pExpire(challengeKey(challengeId), EMAIL_CHANGE_VERIFY_TTL)
    .exec();
};

const consumeEmailChangeVerifyChallenge = async (challengeId: string, otpHash: string) => {
  const challenge = await redis.hGetAll(challengeKey(challengeId));

  if (!challenge || !challenge.userId || !challenge.otpHash || !challenge.newEmail)
    throw new NotFoundError("Invalid or expired verification");

  if (challenge.otpHash !== otpHash) throw new BadRequestError("Invalid OTP ");

  const latestChallenge = await redis.get(userKey(challenge.userId));

  if (latestChallenge !== challengeId) throw new NotFoundError("Invalid or expired verification");

  await redis.multi().del(challengeKey(challengeId)).del(userKey(challenge.userId)).exec();

  return {
    userId: challenge.userId,
    newEmail: challenge.newEmail,
  };
};

export { storeEmailChangeVerifyChallenge, consumeEmailChangeVerifyChallenge };
