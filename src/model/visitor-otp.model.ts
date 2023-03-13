import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class visitorOtp{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column({
        enum:['email', 'number'],
        type:'enum'
    })
    type:string;
    @Column()
    field:string;
    @Column()
    otp:number;
    @Column()
    token:string;
    @Column({
        nullable:false,
        default:0
    })
    is_expired:number;
    
   
}