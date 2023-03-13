import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bookmark{
    @PrimaryGeneratedColumn()
    id:string;
    @Column({
        nullable:false
    })
    user_id:Number;
    @Column({
        nullable:false
    })
    role:string;
    @Column({
        nullable:false
    })
    exhibitor_id:string;
}