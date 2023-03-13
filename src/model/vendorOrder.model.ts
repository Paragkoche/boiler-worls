import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VendorOrderRemark{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    vendor_id:number;
    @Column()
    exhibitor_id:number;
    @Column({
        type:'json'
    })
    items:JSON;
    @Column({
        type:'float'
    })
    sub_total:Number;
    @Column({
        type:'float'
    })
    gst:Number;
    @Column({
        type:'float'
    })
    total:Number;
    @Column({
        type:'enum',
        enum:['pending','processing','shipped','delivered','cancelled'],
        default:'pending'
    })
    status:string;
}