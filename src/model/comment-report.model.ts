import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentReport {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    user_id:string;
    @Column()
    role:string;
    @Column()
    post_id:string;
    @Column()
    comment_id:string;
}