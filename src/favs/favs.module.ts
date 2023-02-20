import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';
import { ArtistEntity } from 'src/entities/artist.entity';
import { FavsEntity } from 'src/entities/favs.entity';
import { TrackEntity } from 'src/entities/track.entity';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavsEntity,
      ArtistEntity,
      TrackEntity,
      AlbumEntity,
    ]),
  ],
  providers: [FavsService],
  controllers: [FavsController],
})
export class FavsModule {}
