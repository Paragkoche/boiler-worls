import { NextFunction,Request,Response } from "express";
import db from "../db/db"
import * as jwt from "jsonwebtoken";
import { EntityMetadata, Repository } from "typeorm";
import { Exhibitor } from "../model/exhibitor.model";
import { Visitor } from "../model/visitor.model";
import { Delegate } from "../model/delegate.model";
export const checkToken = async (req:Request,res:Response,next:NextFunction)=>{
    let token = req.headers.authorization;
    if(token){
        token = token.slice(7);
        jwt.verify(token,process.env.JWTSECRET,(err,decode)=>{
            if(err) res.json({
                status:false,
                message: "Invalid Token..."
              });
            req.headers.exhibitor=decode.toString()
            req.headers.refresh=decode.toString();
            next()
        })
    }
    else{
        next()
    }
    
}
export const checkTokenForSocket =async (token:string,socketId:string)=>{
    if(token){
        token = token.slice(7);
        jwt.verify(token,process.env.JWTSECRET, async (err, decoded:jwt.JwtPayload) => {
            console.log(decoded)
            if (err) return {
                status:false,
                data: '',
                message: "Invalid Token..."
              };
            let model:Repository<any> | null ;
            if(decoded.role == 'exhibitor'){
                model = db.getRepository(Exhibitor);
            }
            if (decoded.role == 'visitor'){
                model = db.getRepository(Visitor);

            }
            if (decoded.role == 'delegate'){
                model = db.getRepository(Delegate);
                
            }
            const user = model.findOne({where:{id:decoded.id}})
            if(user) return {
                status: true, 
                data: await model.update(decoded.id,{socket_id:socketId})
            }
            return {
                status:true,
                data: decoded,
                message: "Token Validated"
            }
        });
    }else{
        return {
            status:false,
            data: '',
            message: "Invalid Token..."
        }
    }

}