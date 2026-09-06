import { prisma } from "@/shared/prisma.js";
import type { ChangePasswordDto } from "@repo/contracts";
import { hashPassword, verifyPassword } from "../crypto/password.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "@/shared/errors/index.js";
import { UserStatus } from "@/generated/prisma/enums.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";

const changePassword = async (
  dto: ChangePasswordDto,
  auth: { userId: string; sessionId: string }
) => {
  const { oldPassword, newPassword } = dto;

  if (oldPassword === newPassword)
    throw new BadRequestError("New Password should not be same as old password");

  const { userId, sessionId } = auth;

  const updatedUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundError("User not found");

    if (user.status !== UserStatus.ACTIVE) throw new ForbiddenError("Account is not active");

    const isMatch = await verifyPassword(oldPassword, user.passwordHash);

    if (!isMatch) throw new BadRequestError("Invalid Old Password");

    const passwordHash = await hashPassword(newPassword);

    const updatedUser = await tx.user.update({
      where: { id: user.id },
      data: { passwordHash },
      select: { name: true, email: true, updatedAt: true },
    });

    // delete all sessions except current
    await tx.session.deleteMany({
      where: {
        userId: user.id,
        id: { not: sessionId },
      },
    });

    return updatedUser;
  });

  await sendEmail({
    to: updatedUser.email,
    template: templateNames.passwordChangedAlert,
    data: {
      name: updatedUser.name,
      time: updatedUser.updatedAt,
    },
  });
};

export { changePassword };
