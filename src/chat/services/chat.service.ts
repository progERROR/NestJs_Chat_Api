import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { FindChatDto } from '../dto/find-chat.dto';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private userService: UserService,
  ) {}

  async createChat(dto): Promise<Chat> {
    const chat = new Chat();
    chat.name = dto.name;
    try {
      chat.users = dto.readyUsers;
      return await this.chatRepository.save(chat);
    } catch (e) {
      throw new HttpException(
        'Something`s wrong during creating a new chat',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getChats(dto: FindChatDto): Promise<Chat[]> {
    const user = await this.userService.findUserWithChats(dto.userId);
    if (!user) {
      throw new HttpException('There is no such user', HttpStatus.NOT_FOUND);
    }
    return user.chats;
  }

  async findChat(id: number): Promise<Chat> {
    return await this.chatRepository.findOne({ where: { id } });
  }

  async findChatWithMessages(id: number): Promise<Chat> {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.messages', 'message')
      .where('chat.id = :id', { id })
      .getOne();
  }
}
