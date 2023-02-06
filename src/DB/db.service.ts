import { Injectable } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/interfaces';

@Injectable()
export class DBService {
  UserDB: User[];
  ArtistsDB: Artist[];
  TracksDB: Track[];
  AlbumsDB: Album[];
  FavsDB: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };
  constructor() {
    this.UserDB = [];
    this.ArtistsDB = [];
    this.TracksDB = [];
    this.AlbumsDB = [];
    this.FavsDB = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }
}
