import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn("uuid")
  chat_interation_id: string;
  @Column()
  message_owner_id: Number;
  @Column()
  message_owner_role: String;
  @Column()
  is_delivered: boolean;
  @Column()
  is_notification_sent: boolean;
  @Column()
  is_read: boolean;
  @Column()
  message: string;
  @Column({ enum: ["text", "image", "video", "audio"], default: "text",type:'enum' })
  message_type: string;
  @Column()
  message_file_name: string;
  @Column()
  message_file_path: string;
  @Column({ default: false })
  is_tagged: boolean;
  @Column()
  tagged_message_id: Number;
}
