import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column({nullable:false})
    user_id:string;
    @Column()
    role:string;
    @Column()
    post_id:string;
}
