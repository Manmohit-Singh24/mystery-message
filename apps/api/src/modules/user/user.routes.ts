import { Router } from "express";

import {
  deactivateProfileSchema,
  deleteProfileSchema,
  getUserByPublicIdSchema,
  isUsernameAvailableSchema,
  updateProfileSchema,
} from "@repo/contracts";

import { validateBody, validateParams, validateQuery } from "@/shared/middleware/validate.js";
import {
  deactivateProfileController,
  deleteProfileController,
  getMeController,
  getUserByIdController,
  isUsernameAvailableController,
  updateProfileController,
} from "./user.controllers.js";
import { requireAuth } from "../auth/index.js";

const userRouter = Router();

userRouter.get("/me", requireAuth, getMeController);
userRouter.patch("/me", requireAuth, validateBody(updateProfileSchema), updateProfileController);

userRouter.delete("/me", requireAuth, validateBody(deleteProfileSchema), deleteProfileController);
userRouter.post(
  "/me/deactivate",
  requireAuth,
  validateBody(deactivateProfileSchema),
  deactivateProfileController
);

userRouter.get(
  "/is-username-available",
  validateQuery(isUsernameAvailableSchema),
  isUsernameAvailableController
);

userRouter.get("/:id", validateParams(getUserByPublicIdSchema), getUserByIdController);

export { userRouter };
