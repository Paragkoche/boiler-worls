import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Coupon{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({
        nullable:false
    })
    user_id:string;
    @Column({enum:['exhibitor','delegate', 'speaker', 'sponsor', 'visitor'],nullable:true,type:'enum'})
    role:string;
    @Column()
    coupon_code:string;
    @Column({nullable:false,default:1})
    day:Number;
    @Column({
        type:'date'
    })
    date:Date 
    @Column({
        type:'time'
    })
    time:Date
    @Column({
        type:'enum',
        enum:['breakfast', 'lunch', 'hi_t',"gala_dinner"]
    })
    type:string;
    @Column()
    is_expired:Number;

}