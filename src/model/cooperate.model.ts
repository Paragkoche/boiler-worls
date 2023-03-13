import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cooperate {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  company_repName: string;
  @Column()
  company_name: string;
  @Column()
  gst_no: string;
  @Column()
  mobile_no: string;
  @Column()
  email: string;
  @Column()
  designation: string;
  @Column()
  country: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column()
  profession: string;
}
