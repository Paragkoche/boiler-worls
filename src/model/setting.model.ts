import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Setting{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    key:string;
    @Column({
        type:'time'
    })
    time:Date;
    @Column({
        type:'date'
    })
    date:Date;
    @Column()
    value:string;
}