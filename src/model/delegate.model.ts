import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delegate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firebaseToken: string;

  @Column()
  socket_id: string;

  @Column({
    enum: ["individual", "organisation"],
    default: "individual",
    type:'enum'
  })
  type: string;
  @Column()
  name: string;
  @Column()
  gender: string;
  @Column()
  designation: string;
  @Column()
  company_name: string;
  @Column()
  company_repProfile: string;
  @Column()
  about_me: string;
  @Column()
  gst: string;
  @Column()
  mobile_no: string;
  @Column()
  email: string;
  @Column()
  blood_group: string;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  hell: string;
  @Column()
  branch: string;
  @Column()
  institute: string;
  @Column()
  password: string;
  @Column()
  district: string;
  @Column({ type: "int", default: 0 })
  day: Number;
  @Column({
    default: false,
  })
  dey_1: boolean;
  @Column({
    default: false,
  })
  dey_2: boolean;
  @Column({
    default: false,
  })
  dey_3: boolean;
  @Column()
  parent: string;
  @Column({
    nullable: false,
    default: "delegate",
  })
  role: string;
  @Column()
  vaccine_certificate: string;
  @Column()
  id_certificate: string;
  @Column()
  payment_status: string;
  @Column()
  order_id: string;
  @Column()
  payment_id: string;
}
