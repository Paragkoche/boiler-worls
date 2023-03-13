import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class loginOtp{
    @PrimaryGeneratedColumn()
    id:string; 
    @Column({enum:['email', 'number'],type:'enum'})
    type:string;
    @Column()
    field:string;
    @Column()
    otp:number;
    @Column()
    token:string
    @Column({
        default:0,
        nullable:false
    })
    is_expired:Number;
}