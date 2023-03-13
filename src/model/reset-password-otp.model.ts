import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class resetPasswordOtp{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column({enum:['email', 'number'],type:'enum'})
    type:string;
    @Column()
    field:string;
    @Column()
    otp:string;
    @Column()
    token:string;
    @Column({
        type:'int',
        nullable:false,
        default:0
    })
    is_expired:number;
   
    
}