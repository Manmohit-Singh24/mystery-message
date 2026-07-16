import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError, ConflictError } from "@/shared/errors/index.js";

const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.auth) throw new UnauthorizedError();
  next();
};

const requireUnAuth = (req: Request, _res: Response, next: NextFunction) => {
  if (req.auth) throw new ConflictError("Already authenticated.");
  next();
};

export { requireAuth, requireUnAuth };
