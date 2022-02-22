import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Chat Api')
    .setDescription(
      'There will be shown all of the API routes that are exist to this moment.',
    )
    .setVersion('1.0.0')
    .addBearerAuth({
      description: `Pass here a JWT`,
      name: 'Authorization',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  });

  await app.listen(configService.get('PORT'));
  console.log(configService.get('HOST'));
}
bootstrap();
