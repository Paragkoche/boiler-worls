import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class E_Visitor{
    @PrimaryGeneratedColumn()
    id:string;
    @Column({
        nullable:false
    })
    user_id:string;
    @Column({
        nullable:false
    })
    role:string;
    @Column({
        nullable:false
    })
    exhibitor_id:Number;

}