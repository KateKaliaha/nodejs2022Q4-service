// import { Exclude } from 'class-transformer';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { TrackEntity } from './track.entity';

@Entity()
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany(() => TrackEntity, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  tracks: TrackEntity[];

  @ManyToMany(() => AlbumEntity, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  albums: AlbumEntity[];
}
