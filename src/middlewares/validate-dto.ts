import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateDto = (dtoClass: new () => object) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject, { whitelist: true });
    if (errors.length > 0) {
      const messages = errors.map((error) => Object.values(error.constraints ?? {})).flat();
      return res.status(400).json({ errors: messages });
    }
    // overwrite body with validated object
    req.body = dtoObject;
    next();
  };
};
