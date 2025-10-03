// validate.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';

// Extender el tipo Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        [key: string]: any;
      };
    }
  }
}

export const authJWTMiddleware = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Obtener el token del header Authorization
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({ 
          error: 'No autorizado',
          message: 'Token no proporcionado' 
        });
        return;
      }

      // 2. Verificar formato: "Bearer TOKEN"
      const parts = authHeader.split(' ');
      
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        res.status(401).json({ 
          error: 'No autorizado',
          message: 'Formato de token inválido' 
        });
        return;
      }

      const token = parts[1];

      // 3. Verificar el token
      const JWT_SECRET = process.env.JWT_SECRET;
      
      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET no configurado');
      }

      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // 4. Adjuntar información del usuario al request
      req.user = {
        id: decoded.id || decoded.userId,
        email: decoded.email,
        ...decoded
      };

      // 5. Continuar con la siguiente función
      next();
      
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        res.status(401).json({ 
          error: 'No autorizado',
          message: 'Token expirado' 
        });
        return;
      }
      
      if (e instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ 
          error: 'No autorizado',
          message: 'Token inválido' 
        });
        return;
      }

      // Error genérico
      res.status(500).json({ 
        error: 'Error interno',
        message: 'Error al validar token' 
      });
      return;
    }
  };
};

// Middleware opcional: validar roles específicos
export const requireRole = (...roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ 
        error: 'No autorizado',
        message: 'Usuario no autenticado' 
      });
      return;
    }

    const userRole = req.user.role;
    
    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({ 
        error: 'Prohibido',
        message: 'No tienes permisos para acceder a este recurso' 
      });
      return;
    }

    next();
  };
};