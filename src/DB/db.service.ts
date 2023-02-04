import { Injectable } from '@nestjs/common';
import { Album, Artist, Track, User } from 'src/interfaces';

@Injectable()
export class DBService {
  UserDB: User[];
  ArtistsDB: Artist[];
  TracksDB: Track[];
  AlbumsDB: Album[];
  constructor() {
    this.UserDB = [];
    this.ArtistsDB = [];
    this.TracksDB = [];
    this.AlbumsDB = [];
  }
}
