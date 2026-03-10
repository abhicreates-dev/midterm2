import { type Request, type Response, type NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;


declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: Number;
      };
    }
  }
}


export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    try {
        const header = req.headers.authorization;
        
        if (!header) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }

        const header1 = header.split(' ');
        const token = header1[1];

        if(token == undefined){
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, jwtSecret as string) as JwtPayload;

        req.user = {
            userId: decoded.userId,
        }
        next();
        
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }
}