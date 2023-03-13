import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class vendor_product{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    vendor_id:number;
    @Column()
    name:string;
    @Column()
    image:string;
    @Column({
        type:'float'
    })
    price:Number;
    @Column()
    description:string;
    @Column({
        default:1
    })
    is_active:number;
}