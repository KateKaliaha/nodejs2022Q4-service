import { Injectable } from '@nestjs/common';
import { Artist, User } from 'src/interfaces';

@Injectable()
export class DBService {
  UserDB: User[];
  PostsDB: string[];
  ArtistsDB: Artist[];
  constructor() {
    this.UserDB = [];
    this.PostsDB = [];
    this.ArtistsDB = [];
  }
}
