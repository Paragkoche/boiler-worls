import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column({nullable:false})
    user_id:string;
    @Column({
        nullable:false
    })
    role:string;
    @Column({
        default:''
    })
    title:string;
    @Column({
        default:''
    })
    caption:string;
    @Column({
        default:''
    })
    video:string;
    @Column({
        default:''
    })
    image:string;
    @Column({
        nullable:false,
        default:1,
    })
    is_active:string;
    
}