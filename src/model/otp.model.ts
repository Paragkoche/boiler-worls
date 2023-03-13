import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class otp{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column({
        enum:['email', 'number'],
        type:'enum'
    })
    type:string;
    @Column()
    field:string
    @Column()
    otp:string
    @Column({
        default:0,
        nullable:false
    })
    is_expired:Number
    
}