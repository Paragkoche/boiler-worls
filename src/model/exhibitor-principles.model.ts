import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExhibitorPrinciple{
    @PrimaryGeneratedColumn()
    id:string; 
    @Column()
    exhibitor_id:string;
    @Column()
    name:string;
    @Column()
    company:string;
    @Column()
    website:string;
    

}