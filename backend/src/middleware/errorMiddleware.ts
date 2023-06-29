import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

export const notFound = (req: Request, res: Response) => {
  const error: Error = new Error(`${req.originalUrl} Not Found`);
  res.status(404).json({ message: error.message });
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  let message: string = err.message;

  // NOTE Check for mongoose error
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
