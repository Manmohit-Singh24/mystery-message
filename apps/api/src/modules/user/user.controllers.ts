import type { Request, Response } from "express";

import type { GetUserByIdDto, GetUserByIdResponse, SuccessResponse } from "@repo/contracts";

import { getUserById } from "./services/index.js";

const getUserByIdController = async (req: Request<GetUserByIdDto>, res: Response) => {
  const { id } = req.params;

  const data = await getUserById({ id });

  res.status(200).json({
    success: true,
    data,
  } satisfies SuccessResponse<GetUserByIdResponse>);
};

export { getUserByIdController };
