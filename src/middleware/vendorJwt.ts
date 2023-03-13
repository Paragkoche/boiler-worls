import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
export const checkVendorToken = async (req: Request, res: Response,next:NextFunction) => {
  let token = req.headers.authorization;
  try {
    if(token){
        token = token.slice(7);
        jwt.verify(token,process.env.JWTSECRET,(err,decode:jwt.JwtPayload)=>{
            req.headers.vendor = decode.toString();
            if(err) return res.json({
                status: false,
                message: "Invalid Token..."
            });
            if(decode.role != 'vendor') return res.json({
                status: false,
                            message: "Invalid Token! Unauthorized User"
            })
            next()
        })
    }else{
        return res.json({
            status:false,
            message: "Invalid Token! Unauthorized User"
        });   
    }
  } catch (e) {
    return res.status(502).json({
      status: false,
      message: "Unauthorized User",
      error: e,
    });
  }
};
