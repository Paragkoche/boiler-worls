import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    mobile_no:string;
    @Column()
    blood_group:string;
    @Column()
    parent_corporate:string;
    @Column()
    parent_exhibitor:string;
    @Column({
        nullable:false,
        type:'int'
    })
    active:Number;
    @Column()
    status:boolean;
    @Column({
        enum:['visitor', 'delegate', 'corporate', 'exhibitee', 'exhibitor', 'vendor'],
        type:'enum',
        default:'delegate'
    })
    role:string;
}