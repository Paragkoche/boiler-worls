import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StallPref{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    exhibitor_id:string;
    @Column({
        default:1
    })
    preference_no:number;
    @Column()
    stall_no:string;
}