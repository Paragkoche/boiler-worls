import * as jwt from "jsonwebtoken";
import {Request,Response,NextFunction}from "express"

export const checkExtension =async(req:Request,res:Response,next:NextFunction)=>{
    try{
        console.log(req.file);
        
    }catch(e){
        return res.status(405).json({
            status: false,
            message: "Unauthorized User",
            error:e
        })
    }
}