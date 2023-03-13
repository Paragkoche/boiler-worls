import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn("uuid") 
    id:string;
    @Column()
    admin_id:string;
    @Column()
    feature:string;
    @Column(
        {
            type:'enum',
            enum:['read', 'create', 'delete', 'update', 'assign', 'confirm']
        }
    )
    capability:string

}