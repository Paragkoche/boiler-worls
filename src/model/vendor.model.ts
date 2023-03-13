import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vendor{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    company_repName:string;
    @Column()
    company_name:string;
    @Column()
    company_logo:string;
    @Column({type:'bigint'})
    mobile_no:number;
    @Column()
    email:string;
    @Column()
    city:string;
    @Column()
    state:string;
    @Column()
    address:string;
    @Column()
    website:string;
    @Column()
    password:string;
    @Column({default:1})
    is_active:Number;
    @Column()
    category:string;
    @Column({
        nullable:false,
        default:'vendor'
    })
    role:string;
}