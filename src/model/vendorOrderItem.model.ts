import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VendorOrderItem{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    order_id:number;
    @Column()
    product_id:number;
    @Column()
    product_name:string;
    @Column()
    product_price:Number;
    @Column()
    product_quantity:Number;
   
}