import { NotFoundError } from "@/shared/errors/NotFoundError.js";
import { prisma } from "@/shared/prisma.js";
import type { GetUserByIdDto } from "@repo/contracts";

const getUserById = async (dto: GetUserByIdDto) => {
  const user = await prisma.user.findUnique({
    where: { publicId: dto.id },
  });

  if (!user) throw new NotFoundError("user not found");

  return {
    name: user.name,
    username: user.username,
    publicId: user.publicId,
  };
};

export { getUserById };
