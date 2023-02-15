import { Module } from '@nestjs/common';
import { DBModule } from './DB/db.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    UsersModule,
    DBModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavsModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: 'db',
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        synchronize: true,
        entities: [UserEntity],
        autoLoadEntities: true,
        logging: true,
        // migrationsTableName: 'migration',
        // migrations: ['src/migration/*.ts'],
        // cli: {
        //   migrationsDir: 'src/migration',
        // },
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
