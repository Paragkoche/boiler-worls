import {date} from "joi";
import db from "../db/db";
import { compareSync } from "bcryptjs";
import {sign} from "jsonwebtoken";
import {generateOTP,sendOTP} from "../helper/otpGaneration";
import {checkDelegateDays,checkEmail,checkEmailwithRole,checkMobilewithRole} from "../helper/checkExsisting.helper"
import  * as CryptoJS from "crypto-js";
import { sendWelcomeEmailDelegate, sendWelcomeEmailVisitor, sendWelcomeExhibitor } from "../helper/email.helper";
import * as moment from "moment";
import { Request, Response } from "express";
import { Users } from "../model/user.model";
import { Exhibitor } from "../model/exhibitor.model";
import { Visitor } from "../model/visitor.model";
import { Delegate } from "../model/delegate.model";
import { Like } from "typeorm";
export const getAll = async(req:Request,res:Response)=>{

 console.log(req["user"])
    let where;
    if (req["user"].role == 'corporate')
        where = {
            parent_corporate: req["user"].id
        }
    if (req["user"].role == 'exhibitor')
        where = {
            parent_exhibitor: req["user"].id
        }
    console.log(where);
    const data = await db.getRepository(Users).find(
        where
    ).catch((e)=>{
        res.status(500).send({
            status: false,
                message: e.message
        })
    })
    res.json(data)

}
export const getOne =async (req:Request,res:Response)=>{
    await db.getRepository(Users).find({ where: { id: req.params.id } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            status: false,
            message: err.message
        });
    })
} 
export const refreshToken = async (req, res) => {
    console.log('-----------refresh Token----------')
    if (!req.refresh) {
        res.send({
            status: false,
            message: "Please Login",
            route: "login",
            redirect: true
        })
        return
    }

    try {
        let users;
        users = await db.getRepository(Exhibitor).findOne(
            {
                where: {
                    id: req.refresh.id
                },
              
            }
        )
        
        // if(!users){
        //     users = await db.delegate.findOne(
        //         {
        //             where: {
        //                 id: req.exhibitor.id
        //             },
        //         }
        //     )
        // }

        // if(!users){
        //     users = await db.visitor.findOne(
        //         {
        //             where: {
        //                 id: req.exhibitor.id
        //             },
        //         }
        //     )
        // }

        if (users) {
            let user = users.dataValues
            
            if (user) {
                const token = sign({
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    mobile_no: user.mobile_no,
                    company_name: user.company_name,
                    company_repName: user.company_repName
                }, process.env.JWTSECRET, { expiresIn: '24h' });
                let route;
                if(user.role == 'exhibitor')
                    route = '/exhibitor';
                if(user.role == 'visitor')
                    route = '/visitor';
                if(user.role == 'delegate')
                    route = '/delegate';
                res.json({
                    status: true,
                    message: "Login successful",
                    token: token,
                    data: user,
                    route: route
                });
                return
            }
            // console.log("pass check " + passwordCheck);
            res.send({
                status: false,
                message: "Please Login",
                route: "login",
                redirect: true
            })
            return
        } else {
            res.send({
                status: false,
                message: "Please Login",
                route: "login",
                redirect: true
            })
            return
        }
    } catch (err) {
        return res.send({
            status: false,
            message: "Error: " + err
        })
    }
}

export const login = async (req, res) => {
    if (!req.body.email) {
        res.send({
            status: false,
            message: "Enter a Email/Mobile"
        })
        return
    }

    if (!req.body.password) {
        res.send({
            status: false,
            message: "Enter a Password"
        })
        return
    }
    try {
        let users;
        users = await db.getRepository(Exhibitor).findOne(
            {
                where:  [
                        {
                            mobile_no:Like('%' + req.body.email)
                            
                        },
                        {
                            email: req.body.email
                        }
                    ]
                            }
        )
        
        if(!users){
            users = await db.getRepository(Delegate).findOne(
                {
                    where:  [
                            {
                                mobile_no: Like('%' + req.body.email)
                                
                            },
                            {
                                email: req.body.email
                            }
                        ]
                    
                }
            )
        }

        if(!users){
            users = await db.getRepository(Visitor).findOne(
                {
                    where: [
                            {
                                mobile_no: Like('%' + req.body.email
                                )
                            },
                            {
                                email: req.body.email
                            }
                        ]
                    
                }
            )
        }

        if(!users){
            users = await db.getRepository(Visitor).findOne(
                {
                    where:  [
                            {
                                mobile_no: Like('%' + req.body.email
                                )
                            },
                            {
                                email: req.body.email
                            }
                        ]
                    
                }
            )
        }

        if (users) {
            let user = users.dataValues
            const passwordCheck = await compareSync(req.body.password, user.password)

            console.log("pass check " + passwordCheck);
            if (passwordCheck) {
                const token = sign({
                    id: user.id,
                    role: user.role,
                    email: user.email,
                    mobile_no: user.mobile_no,
                    company_name: user.company_name,
                    company_repName: user.company_repName
                }, process.env.JWTSECRET, { expiresIn: '24h' });
                let route;
                if(user.role == 'exhibitor')
                    route = '/exhibitor';
                if(user.role == 'visitor')
                    route = '/visitor';
                if(user.role == 'delegate')
                    route = '/delegate';
                if(user.role == 'vendor')
                    route = '/vendor';


                if(user.role == 'exhibitor' && !user.is_confirmed){
                    res.json({
                        status: false,
                        message: "Please wait for Exhibtior Confirmation",
                        data: '',
                        token: 'token',
                        route: route
                    });
                    return
                }
                res.json({
                    status: true,
                    message: "Login successful",
                    data: user,
                    token: token,
                    route: route
                });
                return
            }
            console.log("pass check " + passwordCheck);
            res.send({
                status: false,
                message: "Wrong Password"
            })
        } else {
            res.send({
                status: false,
                message: "Wrong Email or Mobile"
            })
        }
    } catch (err) {
        return res.send({
            status: false,
            message: "Error: " + err
        })
    }
}
export const create = async (req, res) => {
    const exist_mobile = await db.getRepository(Users).findOne({ where: { mobile_no: req.body.mobile_no } })
    if (exist_mobile) {
        res.send({
            status: false,
            message: "Try another mobile no."
        })
        return
    }
    let data;
    console.log(req.user);
    if (req.user) {
        if (req.user.role == 'corporate') {
            data = {
                name: req.body.name,
                email: req.body.email,
                mobile_no: req.body.mobile_no,
                role: 'delegate',
                parent_corporate: req.user.id
            }
        }
        else if (req.user.role == 'exhibitor') {
            data = {
                name: req.body.name,
                email: req.body.email,
                mobile_no: req.body.mobile_no,
                role: 'exhibitee',
                parent_exhibitor: req.user.id
            }
        }
        else {
            data = {
                name: req.body.name,
                email: req.body.email,
                mobile_no: req.body.mobile_no,
                role: req.body.role
            }
        }
    }
    else {
        data = {
            name: req.body.name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            role: req.body.role
        }
    }
    await db.getRepository(Users).save(db.getRepository(Users).create(data))
        .then(async data => {
            
            return res.send({
                status: true,
                message: "successfuly created",
                data: data
            });
        })
        .catch(err => {
            res.status(200).send({
                status: false,
                message: err.message
            })
        })
}
export const generate = async (req, res) => {
    
    console.log('OTP ROUTE')
    const otp = await generateOTP();
    req.body.otp = otp
    console.log(req.body)
    const otpsent = await sendOTP(req.body)
    console.log(otpsent)
    return res.send(otpsent)
}

export const sendWelcomeEmail = async (req, res) => {

    try {
        let ddb;
        if(req.params.role == 'exhibitor')
            ddb = db.getRepository(Exhibitor)
        if(req.params.role == 'visitor')
            ddb = db.getMongoRepository(Visitor)
        if(req.params.role == 'delegate')
            ddb = db.getRepository(Delegate)

        const users = await ddb.findOne({
            where: {
                id: req.params.id,
                role: req.params.role
            }
        })
        
        if (users) {
            if(req.params.role == 'exhibitor')
                await sendWelcomeExhibitor({
                    to: users.dataValues.email,
                    ...users.dataValues
                })
            if(req.params.role == 'visitor' || req.param.role == 'admin')
                await sendWelcomeEmailVisitor({
                    to: users.dataValues.email,
                    ...users.dataValues
                })
            if(req.params.role == 'delegate')
                await sendWelcomeEmailDelegate({
                    to: users.dataValues.email,
                    ...users.dataValues
                })
            res.json({
                status: true,
                message: "Email sent"
            });
            return
        } else {
            res.json({
                status: false,
                message: "Email server is running slow"
            });
            return
        }
    } catch (err) {
        console.log(err.message)
        return res.send({
            status: false,
            message: "Email server is running slow"
        })
    }
}