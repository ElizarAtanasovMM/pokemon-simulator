import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { formatResponse } from "../utils/formatResponse";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  } else {
    res.status(400).json(formatResponse({}, "Validation Error", errors));
  }
};
