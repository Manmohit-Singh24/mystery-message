import { Router } from "express";
import { registerSchema } from "@repo/contracts";

import { validateBody } from "@/shared/middleware/validate.js";

import { registerController } from "./auth.controllers.js";
import { requireUnAuth } from "./middleware/authGaurds.js";

const authRouter = Router();

authRouter.post("/register", requireUnAuth, validateBody(registerSchema), registerController);

export { authRouter };
