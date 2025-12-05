import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error";
import { sendError } from "../utils/response";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (typeof err === "object" && err && "statusCode" in err) {
    const apiErr = err as ApiError;
    return sendError(res, apiErr.statusCode, apiErr.message);
  }

  return sendError(res, 500, "Internal server error");
};
