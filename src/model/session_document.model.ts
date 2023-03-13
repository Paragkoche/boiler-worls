import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SessionDocument{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    session_id:string;
    @Column()
    title:string;
    @Column()
    subtitle:string;
    @Column()
    description:string;
    @Column()
    url:string;
   
    
}