import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import * as joiconfig from './configs/envconfig';
import { DatabaseModule } from './database/database.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ...joiconfig,
    }),
    UserModule,
    ChatModule,
    MessageModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
