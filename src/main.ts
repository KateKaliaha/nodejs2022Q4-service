import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new MyLogger();

  app.useLogger(logger);
  process.on('uncaughtException', (error) => {
    logger.error('[Uncaught Exception]', error);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('[Unhandled Rejection]', reason);
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const config = app.get(ConfigService);
  const SERVER_PORT = config.get<number>('PORT');
  await app.listen(SERVER_PORT || 4000);
}
bootstrap();
