import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id:string; 
    @Column()
    user_id:string;
    @Column()
    role:string;
    @Column()
    title:string;
    @Column()
    body:string;
    @Column()
    from_user_id:string;
    @Column()
    from_user_role:string;
    @Column({
        type:'enum',
        enum:['general', 'comment', 'like', 'follow', 'message', 'post']
    })
    type:string;
    @Column()
    is_read:boolean;
    
}