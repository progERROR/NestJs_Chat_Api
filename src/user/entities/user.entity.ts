import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from '../../chat/entities/chat.entity';
import { Message } from '../../message/entities/message.entity';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Yaroslav', description: 'User`s name' })
  @Column()
  username: string;

  @ApiProperty({
    example: '2021-09-08 19:13:02.726728',
    description: 'Date of creation',
  })
  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];
}
