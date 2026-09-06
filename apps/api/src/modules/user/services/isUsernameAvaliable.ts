import type { IsUsernameAvailableDto } from "@repo/contracts";

import { prisma } from "@/shared/prisma.js";

const isUsernameAvailable = async (dto: IsUsernameAvailableDto) => {
  const user = await prisma.user.findUnique({
    where: { username: dto.username },
  });

  return !user;
};

export { isUsernameAvailable };
