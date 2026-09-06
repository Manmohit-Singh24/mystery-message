import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const validateBody =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };

export const validateParams =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    req.params = schema.parse(req.params) as Request["params"];
    next();
  };

export const validateQuery =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.query) as Request["query"];
    next();
  };
