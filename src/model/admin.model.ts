import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"


@Entity()
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    mobile_no : string;
    @Column()
    email:string
    @Column()
    password:string
    @Column()
    permission:string;
    @Column({enum:['super_admin','admin'],type:'enum'})
    role:String;
    @Column()
    is_active: string;
    @Column()
    created_by:string;

}