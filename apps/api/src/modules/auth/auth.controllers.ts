import type { Request, Response } from "express";
import { register } from "./services/index.js";
import type { SuccessResponse, RegisterResponse } from "@repo/contracts";

const registerController = async (req: Request, res: Response) => {
  const user = await register(req.body);

  res.status(201).json({
    success: true,
    data: user,
  } satisfies SuccessResponse<RegisterResponse>);
};

export { registerController };
