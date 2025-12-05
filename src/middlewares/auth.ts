import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthUserPayload {
  id: string;
  role: 'admin' | 'user';
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUserPayload;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = header.slice(7);
  const secret = process.env.JWT_SECRET ?? '';
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const id = typeof decoded.id === 'string' ? decoded.id : '';
    const role = decoded.role === 'admin' || decoded.role === 'user' ? decoded.role : 'user';
    req.user = { id, role };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (roles: ('admin' | 'user')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
