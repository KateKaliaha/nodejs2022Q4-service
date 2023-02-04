import { Injectable } from '@nestjs/common';
import { Artist, Track, User } from 'src/interfaces';

@Injectable()
export class DBService {
  UserDB: User[];
  ArtistsDB: Artist[];
  TracksDB: Track[];
  constructor() {
    this.UserDB = [];
    this.ArtistsDB = [];
    this.TracksDB = [];
  }
}
