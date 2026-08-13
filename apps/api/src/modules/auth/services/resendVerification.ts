import ms from "ms";

import type { ResendVerificationlDto } from "@repo/contracts";

import { TokenPurpose, UserStatus } from "@/generated/prisma/enums.js";

import { prisma } from "@/shared/prisma.js";
import { logger } from "@/shared/logger.js";

import { generateSecureToken, hashToken } from "../crypto/token.js";

const resendVerification = async ({ email }: ResendVerificationlDto) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.status !== UserStatus.UNVERIFIED) return;

  const activationCode = generateSecureToken();
  const hash = hashToken(activationCode);
  const activationDeadline = new Date(Date.now() + ms("1d"));

  await prisma.user.update({
    where: { id: user.id },
    data: {
      tokenPurpose: TokenPurpose.ACTIVATION,
      verificationTokenHash: hash,
      tokenExpiresAt: activationDeadline,
    },
  });

  logger.warn(`Temperoraily printing code here until email is configured , ${activationCode}`);
  // TODO (EMAIL) : send activation code via email here
};

export { resendVerification };
