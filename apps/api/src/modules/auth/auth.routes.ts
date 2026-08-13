import { Router } from "express";
import { loginSchema, registerSchema } from "@repo/contracts";

import { validateBody } from "@/shared/middleware/validate.js";

import { loginController, registerController, logoutController } from "./auth.controllers.js";
import { requireAuth, requireUnAuth } from "./middleware/authGaurds.js";

const authRouter = Router();

authRouter.post("/register", requireUnAuth, validateBody(registerSchema), registerController);
authRouter.post("/login", requireUnAuth, validateBody(loginSchema), loginController);
authRouter.post("/logout", requireAuth, logoutController);
export { authRouter };
