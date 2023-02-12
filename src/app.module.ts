import { Module } from '@nestjs/common';
import { DBModule } from './DB/db.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    DBModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavsModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
