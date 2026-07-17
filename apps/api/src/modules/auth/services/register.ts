import ms from "ms";
import { nanoid } from "nanoid";

import type { RegisterDto } from "@repo/contracts";

import { TokenPurpose, UserStatus } from "@/generated/prisma/enums.js";
import type { User } from "@/generated/prisma/client.js";

import { prisma } from "@/shared/prisma.js";
import { ConflictError } from "@/shared/errors/ConflictError.js";

import { hashPassword } from "../crypto/password.js";
import { generateSecureToken, hashToken } from "../crypto/token.js";

const register = async (dto: RegisterDto) => {
  const { name, username, email, password } = dto;

  // check if a verified user with this email already exists
  const existingUsers = await prisma.user.findMany({
    where: {
      OR: [{ email }, { username }],
    },
  });

  const deleteUserIds: User["id"][] = [];

  for (const user of existingUsers) {
    if (isUnverifiedExpiredUser(user)) {
      deleteUserIds.push(user.id);
      continue;
    }

    if (user.email === email) throw new ConflictError("Email is already registered.");

    throw new ConflictError("Username is already taken.");
  }

  const passwordHash = await hashPassword(password);
  const activationCode = generateSecureToken();
  const activationDeadline = new Date(Date.now() + ms("1d"));

  const publicId = `usr_${nanoid(16)}`;

  const user = await prisma.$transaction(async (tx) => {
    await Promise.all(
      deleteUserIds.map((id) =>
        tx.user.delete({
          where: { id },
        })
      )
    );

    return await tx.user.create({
      data: {
        name,
        username,
        email,
        passwordHash,
        publicId,
        isAcceptingMessages: false,
        status: UserStatus.UNVERIFIED,
        verificationTokenHash: hashToken(activationCode),
        tokenPurpose: TokenPurpose.ACTIVATION,
        tokenExpiresAt: activationDeadline,
      },
      select: {
        name: true,
        username: true,
        email: true,
        publicId: true,
      },
    });
  });

  // TODO (EMAIL) : send activation code via email here

  return user;
};

function isUnverifiedExpiredUser(user: User) {
  return (
    user.status === UserStatus.UNVERIFIED &&
    user.tokenPurpose === TokenPurpose.ACTIVATION &&
    user.tokenExpiresAt &&
    user.tokenExpiresAt < new Date()
  );
}

export { register };
