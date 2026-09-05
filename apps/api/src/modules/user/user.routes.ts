import { Router } from "express";

import { getUserByPublicIdSchema } from "@repo/contracts";

import { validateParams } from "@/shared/middleware/validate.js";
import { getMeController, getUserByIdController } from "./user.controllers.js";
import { requireAuth } from "../auth/index.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getMeController);

userRouter.get("/:id", validateParams(getUserByPublicIdSchema), getUserByIdController);

export { userRouter };
