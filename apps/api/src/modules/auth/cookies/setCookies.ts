import type { Response } from "express";
import { accessCookieOptions, COOKIE_NAMES, refreshCookieOptions } from "./options.js";

export const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie(COOKIE_NAMES.REFRESH, refreshToken, refreshCookieOptions);
};

export const setAccessCookie = (res: Response, accessToken: string) => {
  res.cookie(COOKIE_NAMES.ACCESS, accessToken, accessCookieOptions);
};
