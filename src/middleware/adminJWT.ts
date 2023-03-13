import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const superAdminToken = async (req: Request,res: Response, next:NextFunction) => {
    let token = req.headers.authorization;
    try {
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.JWTSECRET, (err, decode:jwt.JwtPayload) => {
                req.headers.admin = decode.toString();
                if (decode.role !== 'superadmin') {
                    return res.json({
                        status: false,
                        message: 'Invalid Token! Unauthorized User',
                    });
                }
                if (err) {
                    return res.json({
                        status: false,
                        message: 'Invalid Token...'
                    });
                }
                next();
            });
        } else {
            return res.json({
                status: false,
                message: 'Invalid Token! Unauthorized User',
            });
        }
    } catch (e) {
        return res.status(403).json({
            status:false,
            message: 'Unauthorized Access',
            redirect: 'admin',
            error: e
        })
    }
};