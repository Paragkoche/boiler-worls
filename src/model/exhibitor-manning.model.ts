import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExhibitorManning{
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    exhibitor_id:string;
    @Column()
    name:string;
    @Column()
    designation:string;
    @Column()
    email:string;
    @Column()
    mobile:string;
    @Column()
    blood_group:string;
}