import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/DB/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DBService) {}
  getAll() {
    return this.db.FavsDB;
  }

  addArtist(id: string) {
    const artist = this.db.ArtistsDB.find((item) => item.id === id);

    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.FavsDB.artists.push(artist);
    return artist;
  }

  deleteArtist(id: string) {
    const index = this.db.FavsDB.artists.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.FavsDB.artists.splice(index, 1);
  }

  addAlbum(id: string) {
    const album = this.db.AlbumsDB.find((item) => item.id === id);
    if (!album) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.FavsDB.albums.push(album);
    return album;
  }

  deleteAlbum(id: string) {
    const index = this.db.FavsDB.albums.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.FavsDB.albums.splice(index, 1);
  }

  addTrack(id: string) {
    const track = this.db.TracksDB.find((item) => item.id === id);
    if (!track) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.FavsDB.tracks.push(track);
    return track;
  }

  deleteTrack(id: string) {
    const index = this.db.FavsDB.tracks.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.FavsDB.tracks.splice(index, 1);
  }
}
