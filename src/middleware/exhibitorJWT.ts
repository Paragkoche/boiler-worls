import * as jwt from "jsonwebtoken";
import {Request,Response,NextFunction}from "express"
export const checkToken = async (req:Request,res:Response,next:NextFunction)=>{
    let token = req.headers.authorization;
    try{
        if(token){
            token = token.slice(7);
            jwt.verify(token,process.env.JWTSECRET,(err,decoded:jwt.JwtPayload)=>{
                req['exhibitor'] = decoded
                if(decoded.role !='exhibitor') return res.status(402).json({
                    status: false,
                            message: "Invalid Token! Unauthorized User"
                })
                if(err) return res.status(402).json({
                    status: false,
                            message: "Invalid Token..."
                })
                next()
            })
        }
        else{
            return res.status(402).json({
                status:false,
                    message: "Invalid Token! Unauthorized User"
            })
        }
    }
    catch(e){
        return res.status(402).json({
            status: false,
            message: "Unauthorized User",
            error:e
        })
    }

}