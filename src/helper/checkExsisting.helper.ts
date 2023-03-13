import { Like } from "typeorm";
import db from "../db/db";
import { Delegate } from "../model/delegate.model";
import { Exhibitor } from "../model/exhibitor.model";
import { Visitor } from "../model/visitor.model";

export const checkEmail = async (user:string)=>{
    return await db.query(`
    SELECT email FROM (
        SELECT email AS email FROM exhibitors
        UNION ALL
        SELECT email FROM delegates
        UNION ALL
        SELECT email FROM visitors 
    ) a WHERE email = ? ;
    `,[user])
}
export const checkEmailwithRole = async (user:string,role:string)=>{
    if(role == 'visitor'){
        const users = await db.getRepository(Visitor).findOne({
            where:{
                email:user
            }
        })
        if(users) return users;
    }
    if(role == 'delegate'){
        const users =await db.getRepository(Delegate).findOne({
            where:{
                email:user
            }
        })
        if (users) return users
    }
    if(role == 'exhibitor'){
        const users = await db.getRepository(Exhibitor).findOne({
            where:{
                email:user
            }
        })
        if(users) return users
    }
    return false
}
export const checkMobilewithRole = async (user,role)=>{
    if(role=='visitor'){
        const users = await db.getRepository(Visitor).findOne({
            where:{
                mobile_no:Like(`%${user}`)
            }
        })
        if(users) return users
    }
    if(role == 'delegate'){
        const users = await db.getRepository(Delegate).findOne({
            where:{
                mobile_no:Like(`%${user}`)
            }
        })
        if(users) return users
    }
    if(role == 'exhibitor'){
        const users = await db.getRepository(Exhibitor).findOne({
            where:{
                mobile_no:Like(`%${user}`)
            }
        })
        if(users) return users
    }
    return false
}
export const checkDelegateDays = async()=>{
    const stats =await db.query(`
    select count(*) as total, 
    (select count(*) from delegates where hall = 'Boiler-Users') as boiler_user,
    (select count(*) from delegates where hall = 'Boiler-Users' and day_1 = 1 ) as boiler_user_day_1,
    (select count(*) from delegates where hall = 'Boiler-Users' and day_2 = 1 ) as boiler_user_day_2,
    (select count(*) from delegates where hall = 'Boiler-Users' and day_3 = 1 ) as boiler_user_day_3,
    (select count(*) from delegates where hall = 'Boiler-Users' and day_1 = 1 and day_2 = 1 and day_3 = 1 ) as boiler_user_all_days,
    (select count(*) from delegates where hall = 'Manufacturer-and-Skill-Developement') as manufacturer,
    (select count(*) from delegates where hall = 'Manufacturer-and-Skill-Developement' and day_1 = 1 ) as manufacturer_day_1,
    (select count(*) from delegates where hall = 'Manufacturer-and-Skill-Developement' and day_2 = 1 ) as manufacturer_day_2,
    (select count(*) from delegates where hall = 'Manufacturer-and-Skill-Developement' and day_3 = 1 ) as manufacturer_day_3,
    (select count(*) from delegates where hall = 'Manufacturer-and-Skill-Developement' and day_1 = 1 and day_2 = 1 and day_3 = 1 ) as manufacturer_user_all_days
    from delegates;
    
    `)
    return stats[0]
}