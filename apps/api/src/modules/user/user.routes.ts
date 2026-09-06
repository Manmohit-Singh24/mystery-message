import { Router } from "express";

import { getUserByPublicIdSchema, updateProfileSchema } from "@repo/contracts";

import { validateBody, validateParams } from "@/shared/middleware/validate.js";
import {
  getMeController,
  getUserByIdController,
  updateProfileController,
} from "./user.controllers.js";
import { requireAuth } from "../auth/index.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getMeController);
userRouter.patch("/me", requireAuth, validateBody(updateProfileSchema), updateProfileController);

userRouter.get("/:id", validateParams(getUserByPublicIdSchema), getUserByIdController);

export { userRouter };
