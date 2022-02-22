import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindMessagesDto } from './dto/find-messages.dto';
import { Message } from './entities/message.entity';
import { MessageService } from './services/message.service';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOperation({
    summary: 'Getting all messages which were sent by one needed user',
  })
  @ApiResponse({ status: 200, type: [Message] })
  @Post('get')
  getMessages(@Body() dto: FindMessagesDto): Promise<Message[]> {
    return this.messageService.getMessages(dto);
  }

  @ApiOperation({ summary: 'Creating new message' })
  @ApiResponse({ status: 200, type: Number })
  @Post('add')
  async addMessage(@Body() dto: CreateMessageDto) {
    const message = await this.messageService.addMessage(dto);
    return message.id;
  }
}
