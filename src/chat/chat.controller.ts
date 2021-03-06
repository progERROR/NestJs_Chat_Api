import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindUserPipe } from '../pipes/find-user.pipe';
import { CreateChatDto } from './dto/create-chat.dto';
import { FindChatDto } from './dto/find-chat.dto';
import { Chat } from './entities/chat.entity';
import { ChatService } from './services/chat.service';

@ApiTags('Chats')
@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({ summary: 'Creating new chat' })
  @ApiResponse({ status: 200, type: Number })
  @UsePipes(FindUserPipe)
  @Post('add')
  async createChat(@Body() dto: CreateChatDto): Promise<number> {
    const chat = await this.chatService.createChat(dto);
    return chat.id;
  }

  @ApiOperation({ summary: 'Getting all chats which includes one needed user' })
  @ApiResponse({ status: 200, type: [Chat] })
  @Post('get')
  getChats(@Body() dto: FindChatDto): Promise<Chat[]> {
    return this.chatService.getChats(dto);
  }
}
