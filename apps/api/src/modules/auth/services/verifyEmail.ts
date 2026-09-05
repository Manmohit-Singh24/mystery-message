import { UserStatus } from "@/generated/prisma/enums.js";
import type { VerifyEmailDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";
import { NotFoundError } from "@/shared/errors/index.js";

import { hashToken } from "../crypto/token.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";
import { env } from "@/config/env.js";

const verifyEmail = async ({ token }: VerifyEmailDto) => {
  const hash = hashToken(token);

  const result = await prisma.user.updateManyAndReturn({
    where: {
      tokenHash: hash,
      tokenPurpose: "ACTIVATION",
      status: UserStatus.UNVERIFIED,
      tokenExpiresAt: {
        gt: new Date(),
      },
    },
    data: {
      tokenHash: null,
      tokenPurpose: null,
      tokenExpiresAt: null,
      status: UserStatus.ACTIVE,
      isAcceptingMessages: true,
    },
    select: {
      email: true,
      username: true,
      name: true,
    },
  });

  if (!result || result.length === 0 || !result[0])
    throw new NotFoundError("Invalid or expired verification token");

  const user = result[0];
  await sendEmail({
    to: user.email,
    template: templateNames.welcome,
    data: {
      name: user.name,
      dashboardLink: `${env.CLIENT_URL}/`,
    },
  });
};

export { verifyEmail };
