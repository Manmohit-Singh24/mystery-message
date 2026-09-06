import { TokenPurpose } from "@/generated/prisma/enums.js";
import type { ResetPasswordDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";
import { NotFoundError } from "@/shared/errors/index.js";

import { hashToken } from "../crypto/token.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";
import { hashPassword } from "../crypto/password.js";

const resetPassword = async ({ token, newPassword }: ResetPasswordDto) => {
  const now = new Date();

  const tokenHash = hashToken(token);
  const passwordHash = await hashPassword(newPassword);

  const updateUser = await prisma.$transaction(async (tx) => {
    const users = await tx.user.updateManyAndReturn({
      where: {
        tokenHash,
        tokenPurpose: TokenPurpose.PASSWORD_RESET,
        tokenExpiresAt: {
          gt: now,
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
        name: true,
        id: true,
      },
    });

    if (users.length === 0 || !users[0]) throw new NotFoundError("Invalid or expired reset token");

    await tx.session.deleteMany({ where: { userId: users[0].id } });

    return {
      email: users[0].email,
      name: users[0].name,
    };
  });

  await sendEmail({
    to: updateUser.email,
    template: templateNames.passwordChangedAlert,
    data: {
      name: updateUser.name,
      time: now,
    },
  });
};

export { resetPassword };
