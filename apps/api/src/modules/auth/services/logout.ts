import { prisma } from "@/shared/prisma.js";

type LogoutDTO = {
  userId: string;
  sessionId: string;
};

const logout = async ({ userId, sessionId }: LogoutDTO) => {
  await prisma.session.delete({
    where: {
      userId: userId,
      id: sessionId,
    },
  });
};

export { logout };
