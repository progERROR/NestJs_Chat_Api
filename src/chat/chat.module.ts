import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ChatController } from './chat.controller';
import { Chat } from './entities/chat.entity';
import { ChatService } from './services/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UserModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
