import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('NestJS chat backend')
      .setDescription('Rest API documentation')
      .setVersion('1.0.0')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT || 9000, () => console.log(`Server has been started on PORT: ${PORT}`));
}
bootstrap();
