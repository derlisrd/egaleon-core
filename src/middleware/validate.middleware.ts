// validate.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodObject, z } from "zod";
import logger from "../utils/logger.js";

export const validate = (schema: ZodObject): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (e) {
      
      if (e instanceof z.ZodError) {
        logger.error(e.message)
        res.status(400).json({
          status: 400,
          results:null,
          errors: "Validation error"
        });
        return;
      }
      next(e);
    }
  };
};