import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/DB/db.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private db: DBService) {}
  getAll() {
    return this.db.AlbumsDB;
  }
  getById(id: string) {
    const album = this.db.AlbumsDB.find((item) => item.id === id);
    if (!album) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }
  create(albumDto: CreateAlbumDto) {
    const newAlbum = {
      id: uuidv4(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: albumDto.artistId || null,
    };
    this.db.AlbumsDB.push(newAlbum);
    return newAlbum;
  }

  update(id: string, artistDto: CreateAlbumDto) {
    const index = this.db.AlbumsDB.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.AlbumsDB[index].name = artistDto.name;
    this.db.AlbumsDB[index].year =
      artistDto.year || this.db.AlbumsDB[index].year;
    this.db.AlbumsDB[index].artistId =
      artistDto.artistId || this.db.AlbumsDB[index].artistId;

    return this.db.AlbumsDB[index];
  }

  delete(id: string) {
    const index = this.db.AlbumsDB.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    const album = this.db.AlbumsDB[index];
    const tracks = this.db.TracksDB;
    tracks.map((track) => {
      if (album.id === track.albumId) {
        track.albumId = null;
      }
    });

    const favsAlbums = this.db.FavsDB.albums;
    const findIndexFavsAlbum = favsAlbums.findIndex((item) => item.id === id);
    if (findIndexFavsAlbum !== -1) {
      this.db.FavsDB.albums.splice(findIndexFavsAlbum, 1);
    }

    this.db.FavsDB.tracks.map((track) => {
      if (album.id === track.albumId) {
        track.albumId = null;
      }
    });

    this.db.AlbumsDB.splice(index, 1);
  }
}
