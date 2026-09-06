import { Router } from "express";

import { deleteProfileSchema, getUserByPublicIdSchema, updateProfileSchema } from "@repo/contracts";

import { validateBody, validateParams } from "@/shared/middleware/validate.js";
import {
  deleteProfileController,
  getMeController,
  getUserByIdController,
  updateProfileController,
} from "./user.controllers.js";
import { requireAuth } from "../auth/index.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getMeController);
userRouter.patch("/me", requireAuth, validateBody(updateProfileSchema), updateProfileController);

userRouter.delete("/me", requireAuth, validateBody(deleteProfileSchema), deleteProfileController);

userRouter.get("/:id", validateParams(getUserByPublicIdSchema), getUserByIdController);

export { userRouter };
