import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import {Chat} from "./chat/chat.entity";
import {User} from "./user/user.entity";
import {Message} from "./message/message.entity";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          database: process.env.DB_DATABASE,
          password: process.env.DB_PASSWORD,
          entities: [Chat, User, Message],
      }),
      UserModule,
      ChatModule,
      MessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
