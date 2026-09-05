import type { Response } from "express";

import { accessCookieOptions, COOKIE_NAMES, refreshCookieOptions } from "./options.js";

export const clearRefreshCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.REFRESH, refreshCookieOptions);
};

export const clearAccessCookie = (res: Response) => {
  res.clearCookie(COOKIE_NAMES.ACCESS, accessCookieOptions);
};
