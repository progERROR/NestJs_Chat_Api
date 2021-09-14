import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Chat} from "./chat.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
      UserModule
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService]
})
export class ChatModule {}
