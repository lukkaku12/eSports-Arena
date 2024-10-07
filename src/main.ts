import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['localhost', 'https://www.google.com'],
    methods: 'GET, POST, PATCH, DELETE',
    credentials: true,
  });
  const doc = new DocumentBuilder()
  .setTitle('E-sports Arena API')
    .setDescription('On my way to pass the filter!')
    .setVersion('1.0')
    .addTag('striving but aint failing')
    .build();

    const document = SwaggerModule.createDocument(app, doc);
    SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
