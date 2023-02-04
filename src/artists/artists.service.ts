import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from 'src/DB/db.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private db: DBService) {}
  getAll() {
    return this.db.ArtistsDB;
  }
  getById(id: string) {
    const artist = this.db.ArtistsDB.find((item) => item.id === id);
    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }
  create(artistDto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...artistDto,
    };
    this.db.ArtistsDB.push(newArtist);
    return newArtist;
  }

  update(id: string, artistDto: CreateArtistDto) {
    const index = this.db.ArtistsDB.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    this.db.ArtistsDB[index].name = artistDto.name;
    this.db.ArtistsDB[index].grammy = artistDto.grammy;

    return this.db.ArtistsDB[index];
  }

  delete(id: string) {
    const index = this.db.ArtistsDB.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    const artist = this.db.ArtistsDB.find((item) => item.id === id);
    const tracks = this.db.TracksDB;
    tracks.map((track) => {
      if (artist.id === track.artistId) {
        track.artistId = null;
      }
    });

    const albums = this.db.AlbumsDB;
    albums.map((album) => {
      if (artist.id === album.artistId) {
        album.artistId = null;
      }
    });

    const favsArtists = this.db.FavsDB.artists;
    const findIndexFavsArtist = favsArtists.findIndex((item) => item.id === id);
    console.log(findIndexFavsArtist);
    if (findIndexFavsArtist !== -1) {
      this.db.FavsDB.artists.splice(findIndexFavsArtist, 1);
    }

    this.db.FavsDB.albums.map((album) => {
      if (artist.id === album.artistId) {
        album.artistId = null;
      }
    });

    this.db.FavsDB.tracks.map((track) => {
      if (artist.id === track.artistId) {
        track.artistId = null;
      }
    });

    this.db.ArtistsDB.splice(index, 1);
  }
}
