import type { ResetPasswordDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";
import { NotFoundError } from "@/shared/errors/index.js";

import { hashToken } from "../crypto/token.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";
import { hashPassword } from "../crypto/password.js";
import { consumePasswordResetToken } from "../redis/passwordReset.js";

const resetPassword = async ({ token, newPassword }: ResetPasswordDto) => {
  const tokenHash = hashToken(token);

  const userId = await consumePasswordResetToken(tokenHash);

  if (!userId) throw new NotFoundError("Invalid or expired reset token");

  const passwordHash = await hashPassword(newPassword);

  const updateUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash,
      },
      select: {
        email: true,
        name: true,
        id: true,
      },
    });

    await tx.session.deleteMany({ where: { userId: user.id } });

    return {
      email: user.email,
      name: user.name,
    };
  });

  await sendEmail({
    to: updateUser.email,
    template: templateNames.passwordChangedAlert,
    data: {
      name: updateUser.name,
      time: new Date(),
    },
  });
};

export { resetPassword };
