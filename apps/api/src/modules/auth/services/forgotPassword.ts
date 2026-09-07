import { prisma } from "@/shared/prisma.js";
import type { ForgotPasswordDto } from "@repo/contracts";
import { generateSecureToken, hashToken } from "../crypto/token.js";
import { sendEmail } from "@/shared/mail/mail.js";
import { templateNames } from "@/shared/mail/index.js";
import { env } from "@/config/env.js";
import { storePasswordResetToken } from "../redis/passwordReset.js";

const forgotPassword = async ({ email }: ForgotPasswordDto) => {
  const token = generateSecureToken();
  const tokenHash = hashToken(token);

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return;

  await storePasswordResetToken(tokenHash, user.id);

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
