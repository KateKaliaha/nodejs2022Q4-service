import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces';

@Injectable()
export class DBService {
  UserDB: User[];
  PostsDB: string[];
  constructor() {
    this.UserDB = [];
    this.PostsDB = [];
  }
}
