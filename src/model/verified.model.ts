import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class verified{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    field:string;
    @Column()
    otp:number;
    @Column({
        nullable:false,
        default:0
    })
    is_verified:number;
    
   
}