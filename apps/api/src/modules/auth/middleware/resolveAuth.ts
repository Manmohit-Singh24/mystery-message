import type { Request, Response, NextFunction } from "express";

import { verifyAccessToken } from "../jwt/access.js";

const resolveAuth = (req: Request, _res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;

  if (!accessToken) return next();

  const payload = verifyAccessToken(accessToken);

  req.auth = {
    userId: payload.userId,
    sessionId: payload.sessionId,
  };

  next();
};

export { resolveAuth };
