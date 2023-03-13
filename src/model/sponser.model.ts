import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sponser{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    company_name:string;
    @Column()
    name:string;
    @Column()
    mobile_no:string;
    @Column()
    email:string;
    @Column()
    designation:string;
    @Column()
    website:string;
    @Column()
    country:string;
    @Column()
    password:string;
    @Column()
    type:string;
    @Column({
        enum:["sponser"],
        type:'enum'
    })
    category:string;
    @Column({
        nullable:false,
        default:'sponser'
    })
    role:string;
}