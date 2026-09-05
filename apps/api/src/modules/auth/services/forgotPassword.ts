import { prisma } from "@/shared/prisma.js";
import type { ForgotPasswordDto } from "@repo/contracts";
import { generateSecureToken, hashToken } from "../crypto/token.js";
import ms from "ms";
import { TokenPurpose } from "@/generated/prisma/enums.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";
import { env } from "@/config/env.js";

const forgotPassword = async ({ email }: ForgotPasswordDto) => {
  const token = generateSecureToken();
  const deadline = new Date(Date.now() + ms("30m"));
  const hash = hashToken(token);

  /*
    Using only `update` will throw error when no match found.
    We don't want that the "email not exist" should reach outside this service
    The API should not reveal whether an account exists.
    So we used `updateManyAndReturn` as it will not throw.
    We avoided the ususal step to first try finding user and update only if found
    that would make 2 db requests, now one is doing the job.
  */

  const users = await prisma.user.updateManyAndReturn({
    where: { email },
    data: {
      tokenPurpose: TokenPurpose.PASSWORD_RESET,
      verificationTokenHash: hash,
      tokenExpiresAt: deadline,
    },
  });

  if (users.length === 0 || !users[0]) return;

  const user = users[0];

  await sendEmail({
    to: user.email,
    template: templateNames.passwordReset,
    data: {
      name: user.name,
      resetUrl: `${env.CLIENT_URL}/auth/reset-password?token=${token}`,
    },
  });
};

export { forgotPassword };
