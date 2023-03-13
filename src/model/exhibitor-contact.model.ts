import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExhibitorContact {
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    exhibitor_id:string;
    @Column()
    title :string;
    @Column()
    first_name :string;
    @Column()
    last_name:string;
    @Column()
    email:string;
    @Column()
    alternate_email:string;
    @Column()
    onsite_contact_name:string;
    @Column()
    mobile:string;
}