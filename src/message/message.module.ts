import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import {ChatModule} from "../chat/chat.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./message.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([Message]),
      ChatModule,
      UserModule
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
