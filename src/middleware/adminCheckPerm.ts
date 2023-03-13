import { NextFunction,Request,Response } from "express";
import * as jwt from "jsonwebtoken" 
import {config} from "dotenv"
config();

import db from "../db/db";
import { Permission } from "../model/permission.model";
export const checkPermission =(feature:string,capability:string)=>(req:Request,res:Response,next:NextFunction)=>{
    console.log("text");
    
    let token = req.headers.authorization;
    console.log(token);
    
    try{
        if(token){
            token=token.slice(7);
            jwt.verify(token,process.env.JWTSECRET,async(error,decoded:jwt.JwtPayload)=>{
                req['admin'] = decoded
                if(error) {
                    console.log('err');
                        console.log(error);
                        return res.status(403).json({
                            status: false,
                            message: "Unauthorized Access",
                            redirect: true,
                            path: "login"
                        }) 
                }
                if(!decoded){
                    return res.status(403).json({
                        status: false,
                            message: "Unauthorized Access",
                            redirect: true,
                            path: "login"
                    })
                }
                if(decoded.role == "superadmin"){
                    next();
                }else{
                    const adminPerm = db.getRepository(Permission).findOne({
                        where:{
                            admin_id:decoded.id,
                            feature:feature,
                            capability:capability
                        }
                    });
                    if(adminPerm){
                        next();
                    }
                    else{
                        return res.status(403).json({
                            status: false,
                            message: "Not enough permission",
                            redirect: false,
                            path: "/"
                        })
                    }
                }
            })
        }
        else {
            //   next()
            return res.status(403).json({
                status: false,
                message: "Unauthorized Access",
                redirect: true,
                path: "login"
            })
        }
    }
    catch (e){
        return res.status(403).json({
            status: false,
            message: "Unauthorized Access",
            redirect: true,
            path: "login"
        })
    }
}
export const refreshToken = (feature = 'refresh', capability = '')=>async(req:Request,res:Response,next:NextFunction)=>{
    let token = req.headers.authorization;
    try{
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
                req['admin'] = decoded
                if(!decoded){
                    return res.status(403).json({
                        status: false,
                        message: "Unauthorized Access",
                        redirect: true,
                        path: "login"
                    })
                }                    
                if (err) {
                    console.log('err');
                    console.log(err);
                    return res.status(403).json({
                        status: false,
                        message: "Unauthorized Access",
                        redirect: true,
                        path: "login"
                    })
                }
                next()
            });
        } else {
            //   next()
            return res.status(403).json({
                status: false,
                message: "Unauthorized Access",
                redirect: true,
                path: "login"
            })
        }
    }catch (e){
        return res.status(403).json({
            status: false,
            message: "Unauthorized Access",
            redirect: true,
            path: "login"
        })
    }
}