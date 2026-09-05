import { TokenPurpose } from "@/generated/prisma/enums.js";
import type { ResetPasswordDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";
import { NotFoundError } from "@/shared/errors/index.js";

import { hashToken } from "../crypto/token.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";
import { hashPassword } from "../crypto/password.js";

const resetPassword = async ({ token, newPassword }: ResetPasswordDto) => {
  const tokenHash = hashToken(token);
  const passwordHash = await hashPassword(newPassword);

  const result = await prisma.user.updateManyAndReturn({
    where: {
      tokenHash,
      tokenPurpose: TokenPurpose.PASSWORD_RESET,
      tokenExpiresAt: {
        gt: new Date(),
      },
    },
    data: {
      tokenHash: null,
      tokenPurpose: null,
      tokenExpiresAt: null,
      passwordHash,
    },
    select: {
      email: true,
      username: true,
      name: true,
    },
  });

  if (result.length === 0 || !result[0]) throw new NotFoundError("Invalid or expired reset token");

  const user = result[0];

  await sendEmail({
    to: user.email,
    template: templateNames.passwordChangedAlert,
    data: {
      name: user.name,
      time: new Date(Date.now()),
    },
  });
};

export { resetPassword };
