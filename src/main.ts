import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //     whitelist: true,
  //   }),
  // );
  app.enableCors();
  const config = app.get(ConfigService);
  const SERVER_PORT = config.get<number>('PORT');
  await app.listen(SERVER_PORT || 4000);
}
bootstrap();
