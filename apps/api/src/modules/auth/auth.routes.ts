import { Router } from "express";
import {
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailSchema,
} from "@repo/contracts";

import { validateBody } from "@/shared/middleware/validate.js";

import {
  loginController,
  registerController,
  logoutController,
  verifyEmailController,
  resendVerificationController,
} from "./auth.controllers.js";
import { requireAuth, requireUnAuth } from "./middleware/authGaurds.js";

const authRouter = Router();

authRouter.post("/register", requireUnAuth, validateBody(registerSchema), registerController);
authRouter.post("/login", requireUnAuth, validateBody(loginSchema), loginController);
authRouter.post("/logout", requireAuth, logoutController);
authRouter.post("/verify-email", validateBody(verifyEmailSchema), verifyEmailController);
authRouter.post(
  "/resend-verification",
  validateBody(resendVerificationSchema),
  resendVerificationController
);

export { authRouter };
