import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from '../chat/chat.module';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './services/message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ChatModule, UserModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
