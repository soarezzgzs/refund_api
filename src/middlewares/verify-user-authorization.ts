import {Request, Response, NextFunction} from "express";
import {AppError} from "../utils/AppError";


interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}


function verifyUserAuthorization(role: string[]) {
    return (request: AuthRequest, response: Response, next: NextFunction) => {
        if(!request.user || !role.includes(request.user.role)) {
            throw new AppError("Insufficient permission", 401)
        }
        return next()
    }
}

export {verifyUserAuthorization}