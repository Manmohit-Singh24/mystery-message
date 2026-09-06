import type { Request, Response } from "express";

import type { GetUserByIdDto, GetUserResponse, SuccessResponse } from "@repo/contracts";

import { getUserByPublicId, getUserById, updateProfile } from "./services/index.js";

const getUserByIdController = async (req: Request<GetUserByIdDto>, res: Response) => {
  const { id } = req.params;

  const data = await getUserByPublicId({ id });

  res.status(200).json({
    success: true,
    data,
  } satisfies SuccessResponse<GetUserResponse>);
};

const getMeController = async (req: Request, res: Response) => {
  const { userId } = req.auth!;

  const data = await getUserById({ id: userId });

  res.status(200).json({
    success: true,
    data,
  } satisfies SuccessResponse<GetUserResponse>);
};

const updateProfileController = async (req: Request, res: Response) => {
  const { userId } = req.auth!;

  await updateProfile(req.body, userId);

  res.status(200).json({
    success: true,
    data: null,
  } satisfies SuccessResponse<null>);
};

export { getUserByIdController, getMeController, updateProfileController };
