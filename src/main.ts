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
    logger.error('[Uncaught Exception]', error, error.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (error: Error) => {
    logger.error('[Unhandled Rejection]', error.stack);
    process.exit(1);
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const config = app.get(ConfigService);
  const SERVER_PORT = config.get<number>('PORT');
  await app.listen(SERVER_PORT || 4000);
}
bootstrap();
