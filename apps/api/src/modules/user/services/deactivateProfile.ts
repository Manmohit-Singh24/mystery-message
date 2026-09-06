import type { DeactivateProfileDto } from "@repo/contracts";

import { BadRequestError, NotFoundError } from "@/shared/errors/index.js";
import { UserStatus } from "@/generated/prisma/enums.js";
import { prisma } from "@/shared/prisma.js";

import { verifyPassword } from "@/modules/auth/index.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";

const deactivateProfile = async (dto: DeactivateProfileDto, id: string) => {
  const { password } = dto;

  const deactivatedUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundError("user not found");

    if (user.status !== UserStatus.ACTIVE) throw new BadRequestError("Invalid Request");

    const isMatch = await verifyPassword(password, user.passwordHash);

    if (!isMatch) throw new BadRequestError("Invalid Password");

    await tx.user.update({
      where: { id: user.id },
      data: {
        status: UserStatus.DEACTIVATED,
      },
    });

    await tx.session.deleteMany({
      where: { userId: user.id },
    });

    return { name: user.name, email: user.email };
  });

  await sendEmail({
    to: deactivatedUser.email,
    template: templateNames.accountDeactivateAlert,
    data: {
      name: deactivatedUser.name,
    },
  });
};

export { deactivateProfile };
