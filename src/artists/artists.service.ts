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
    this.db.ArtistsDB.splice(index, 1);
  }
}
