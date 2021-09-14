import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "./message.entity";
import {Repository} from "typeorm";
import {FindMessagesDto} from "./find-messages.dto";
import {ChatService} from "../chat/chat.service";
import {CreateMessageDto} from "./create-message.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class MessageService {
    constructor(@InjectRepository(Message) private messageRepository: Repository<Message>,
                private chatService: ChatService,
                private userService: UserService) {}

    async getMessages (dto: FindMessagesDto): Promise<Message[]> {
        const chat = await this.chatService.findChatWithMessages(dto.chatId)
        if (!chat) {
            throw new HttpException('There is no such chat', HttpStatus.NOT_FOUND)
        }
        return chat.messages
    }

    async addMessage (dto: CreateMessageDto): Promise<Message> {
        const message = new Message()
        message.text = dto.text
        try {
            message.user = await this.userService.findUser(dto.userId)
            message.chat = await this.chatService.findChat(dto.chatId)
            return this.messageRepository.save(message)
        } catch (e) {
            throw new HttpException('Something`s wrong during creating a new message', HttpStatus.BAD_REQUEST)
        }
    }
}
