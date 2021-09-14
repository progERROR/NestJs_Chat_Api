import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Chat} from "../chat/chat.entity";
import {User} from "../user/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Message {
    @ApiProperty({example: '1', description: 'Unique identifier'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Hello, how was your day?', description: 'Text of a new message'})
    @Column()
    text: string;

    @ApiProperty({example: '2021-09-08 19:13:02.726728', description: 'Date of creation'})
    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

    @ManyToOne(() => User, user => user.messages)
    user: User;
}