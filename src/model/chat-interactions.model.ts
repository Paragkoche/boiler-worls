import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatInteraction {
  @PrimaryGeneratedColumn("uuid")
  from_id: string;
  @Column()
  from_role: string;
  @Column()
  to_id: string;
  @Column()
  to_role: string;
  @Column()
  initiator_id: number;
  @Column()
  initiator_role: string;
  @Column({ default: false })
  request_approved: boolean;
  @Column({ default: false })
  request_rejected: boolean;
  @Column({ type: "date" })
  requested_at: Date;
  @Column({ type: "date" })
  request_approved_at: Date;
  @Column()
  is_active: boolean;
}
