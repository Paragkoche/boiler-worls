import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Forget_password{
    @PrimaryGeneratedColumn()
    id:string; 
    @Column({
        enum:['email', 'number'],
        type:'enum'
    })
    type:string;
    @Column()
    value:string;
    @Column()
    otp:number;
    @Column({
        nullable:false,
        default:0
    })
    is_expired:number;
    
}