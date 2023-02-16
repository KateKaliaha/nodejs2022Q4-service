import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { TrackEntity } from './track.entity';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums)
  @JoinColumn()
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albums)
  tracks: TrackEntity[];
}
