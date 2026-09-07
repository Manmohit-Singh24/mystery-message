import { env } from "@/config/env.js";

import { UserStatus } from "@/generated/prisma/enums.js";

import { generateSecureToken, hashToken } from "@/modules/auth/crypto/token.js";

import { NotFoundError } from "@/shared/errors/NotFoundError.js";
import { templateNames } from "@/shared/mail/index.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { prisma } from "@/shared/prisma.js";

import { storeEmailChangeAuthToken } from "../redis/emailChangeAuth.js";

const requestEmailChange = async (id: string) => {
  const token = generateSecureToken();
  const tokenHash = hashToken(token);

  const user = await prisma.user.findUnique({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
  });

  if (!user) throw new NotFoundError("User Not Found");

  await storeEmailChangeAuthToken(tokenHash, user.id);

  await sendEmail({
    to: user.email,
    template: templateNames.emailChangeAuth,
    data: {
      name: user.name,
      changeEmailUrl: `${env.CLIENT_URL}/user/update-email?token=${token}`,
    },
  });
};

export { requestEmailChange };
