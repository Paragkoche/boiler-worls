import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OEMRemark {
    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column()
    exhibitorId:string
    @Column()
    oem_form_name:string
    @Column()
    comment:string
    @Column()
    remarkBy:string
    @Column({
        enum:['open', 'resolved'],
        default:'open',
        type:'enum'
    })
    status:string
    
}