import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DBService } from 'src/DB/db.service';

@Injectable()
export class FavsService {
  constructor(private db: DBService) {}
  getAll() {
    const albums = this.db.FavsDB.albums.map((item) =>
      this.db.AlbumsDB.find((el) => el.id === item),
    );
    const tracks = this.db.FavsDB.tracks.map((item) =>
      this.db.TracksDB.find((el) => el.id === item),
    );
    const artists = this.db.FavsDB.artists.map((item) =>
      this.db.ArtistsDB.find((el) => el.id === item),
    );
    return { albums, tracks, artists };
  }

  addArtist(id: string) {
    const artist = this.db.ArtistsDB.find((item) => item.id === id);

    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.FavsDB.artists.push(id);
    return 'Artist added to favorites';
  }

  deleteArtist(id: string) {
    const index = this.db.FavsDB.artists.findIndex((item) => item === id);
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

    this.db.FavsDB.albums.push(id);
    return 'Album added to favorites';
  }

  deleteAlbum(id: string) {
    const index = this.db.FavsDB.albums.findIndex((item) => item === id);
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

    this.db.FavsDB.tracks.push(id);
    return 'Track added to favorites';
  }

  deleteTrack(id: string) {
    const index = this.db.FavsDB.tracks.findIndex((item) => item === id);
    if (index === -1) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.FavsDB.tracks.splice(index, 1);
  }
}
