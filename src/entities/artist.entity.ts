import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from './track.entity';

@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => TrackEntity, (track) => track.artist)
  tracks: TrackEntity[];

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  albums: AlbumEntity[];
}
