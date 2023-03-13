import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VendorOrder{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    order_id:number;
    @Column()
    exhibitor_id:number;
    @Column()
    vendor_id:number;
    @Column()
    title:string;
    @Column()
    body:string;
    @Column()
    readStatus:boolean;
}