import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hall {
    @PrimaryGeneratedColumn()
    id:string; 
    @Column()
    name:string
}