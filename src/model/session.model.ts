import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Session{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    title:string;
    @Column()
    image:string;
    @Column()
    hall_id:string;
    @Column()
    speaker_id:string;
    @Column()
    no_of_days:string;
    @Column({
        type:'text'
    })
    content:string;
    @Column({
        type:'date'
    })
    start_date:Date;
    @Column(
        {
            type:'date'
        }
    )
    end_date:Date;
}