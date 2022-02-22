import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../../message/entities/message.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Chat {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Our group chat', description: 'Name of a new chat' })
  @Column()
  name: string;

  @ApiProperty({
    example: '2021-09-08 19:13:02.726728',
    description: 'Date of creation',
  })
  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
