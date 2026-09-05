import { Router } from "express";

import { getUserByIdSchema } from "@repo/contracts";

import { validateParams } from "@/shared/middleware/validate.js";
import { getUserByIdController } from "./user.controllers.js";

const userRouter = Router();

userRouter.get("/:id", validateParams(getUserByIdSchema), getUserByIdController);

export { userRouter };
