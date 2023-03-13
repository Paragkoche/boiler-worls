import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  firebaseToken: string;
  @Column()
  socket_id: string;
  @Column()
  name: string;
  @Column()
  profile: string;
  @Column()
  about_me: string;
  @Column()
  designation: string;
  @Column()
  company_name: string;
  @Column()
  gst: string;
  @Column()
  mobile_no: string;
  @Column()
  email: string;
  @Column()
  blood_group: string;
  @Column()
  category: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  password: string;
  @Column({
    nullable: false,
    default: "speaker",
  })
  role: string;
  @Column()
  vaccine_certificate: string;
  @Column()
  id_certificate: string;
}
