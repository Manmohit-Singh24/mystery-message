import type { AuthorizeEmailChangeDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";
import { BadRequestError, ConflictError, NotFoundError } from "@/shared/errors/index.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";

import { verifyPassword } from "@/modules/auth/index.js";
import { generateSecureToken, hashToken } from "@/modules/auth/crypto/token.js";

import { consumeEmailChangeAuthToken, getEmailChangeAuthUser } from "../redis/emailChangeAuth.js";
import { storeEmailChangeVerifyChallenge } from "../redis/emailChangeVerify.js";
import { generateOtp } from "../crypto/otp.js";

const authorizeEmailChange = async (dto: AuthorizeEmailChangeDto) => {
  const { token, newEmail, password } = dto;

  const existingUser = await prisma.user.findUnique({ where: { email: newEmail } });

  if (existingUser) throw new ConflictError("Email not avaliable");

  const tokenHash = hashToken(token);

  const userId = await getEmailChangeAuthUser(tokenHash);

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new NotFoundError("Invalid or expired email change token");

  const isPasswordMatch = await verifyPassword(password, user.passwordHash);

  if (!isPasswordMatch) throw new BadRequestError("Invalid password");

  await consumeEmailChangeAuthToken(tokenHash);

  const otp = generateOtp(8);
  const otpHash = hashToken(otp);
  const challengeId = generateSecureToken();

  await storeEmailChangeVerifyChallenge(challengeId, {
    otpHash,
    userId: user.id,
    newEmail,
  });

  await sendEmail({
    to: newEmail,
    template: templateNames.emailChangeOtp,
    data: {
      otp,
    },
  });

  return challengeId;
};

export { authorizeEmailChange };
