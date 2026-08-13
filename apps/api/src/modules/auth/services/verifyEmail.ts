import { UserStatus } from "@/generated/prisma/enums.js";
import type { VerifyEmailDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";
import { NotFoundError } from "@/shared/errors/index.js";

import { hashToken } from "../crypto/token.js";

const verifyEmail = async ({ token }: VerifyEmailDto) => {
  const hash = hashToken(token);

  const result = await prisma.user.updateMany({
    where: {
      verificationTokenHash: hash,
      tokenPurpose: "ACTIVATION",
      status: UserStatus.UNVERIFIED,
      tokenExpiresAt: {
        gt: new Date(),
      },
    },
    data: {
      verificationTokenHash: null,
      tokenPurpose: null,
      tokenExpiresAt: null,
      status: UserStatus.ACTIVE,
      isAcceptingMessages: true,
    },
  });

  if (result.count === 0) throw new NotFoundError("Invalid or expired verification token");
};

export { verifyEmail };
