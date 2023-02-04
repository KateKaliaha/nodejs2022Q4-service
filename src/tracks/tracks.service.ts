import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/DB/db.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(private db: DBService) {}
  getAll() {
    return this.db.TracksDB;
  }
  getById(id: string) {
    const track = this.db.TracksDB.find((item) => item.id === id);
    if (!track) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }
  create(trackDto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      name: trackDto.name,
      artistId: trackDto.artistId || null,
      albumId: trackDto.albumId || null,
      duration: trackDto.duration,
    };
    this.db.TracksDB.push(newTrack);
    return newTrack;
  }

  update(id: string, trackDto: CreateTrackDto) {
    const index = this.db.TracksDB.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.TracksDB[index].name = trackDto.name;
    this.db.TracksDB[index].artistId = trackDto.artistId
      ? trackDto.artistId
      : this.db.TracksDB[index].artistId;
    this.db.TracksDB[index].albumId = trackDto.albumId
      ? trackDto.albumId
      : this.db.TracksDB[index].albumId;
    this.db.TracksDB[index].duration = trackDto.duration;

    return this.db.TracksDB[index];
  }

  delete(id: string) {
    const index = this.db.TracksDB.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    const favsTracks = this.db.FavsDB.tracks;
    const findIndexFavsTrack = favsTracks.findIndex((item) => item.id === id);
    if (findIndexFavsTrack !== -1) {
      this.db.FavsDB.tracks.splice(findIndexFavsTrack, 1);
    }

    this.db.TracksDB.splice(index, 1);
  }
}
