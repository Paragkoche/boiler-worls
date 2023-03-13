import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExhibitorContractor {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  exhibitor_id:string;
  @Column()
  contractor_company_name:string;
  @Column()
  contractor_person_name:string;
  @Column()
  contractor_person_mobile:string;
  @Column()
  contractor_person_email:string;
  @Column()
  authorisation_letter:string
}
