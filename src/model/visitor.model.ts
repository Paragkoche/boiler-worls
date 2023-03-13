import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Visitor{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    firebaseToken:string;
    @Column()
    socket_id:string;
    @Column()
    company_repName:string;
    @Column()
    company_logo:string;
    @Column()
    company_repProfile:string;
    @Column()
    about_me:string;
    @Column()
    blood_group:string;
    @Column()
    mobile_no:string;
    @Column()
    email:string;
    @Column()
    alternative_email:string;
    @Column()
    designation:string;
    @Column()
    address_line1:string;
    @Column()
    address_line2:string;
    @Column()
    address_line3:string;
    @Column()
    city:string;
    @Column()
    state:string;
    @Column()
    country:string;

    @Column()
    password:string;
    @Column()
    visitor:string;
    @Column()
    profession:string;
    @Column()
    vaccine_certificate:string;
    @Column()
    id_certificate:string;
    @Column({
        nullable: false,
        default: 'visitor'
    })
    role:string;
    @Column({
        default:false
    })
    account_deletion_request:boolean;
}