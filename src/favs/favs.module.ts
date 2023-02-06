import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
})
export class FavsModule {}
