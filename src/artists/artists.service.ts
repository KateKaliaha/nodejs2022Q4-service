import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artists: Repository<ArtistEntity>,
  ) {}
  async getAll() {
    return await this.artists.find();
  }

  async getById(id: string) {
    const artist = await this.artists.findOne({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async create(artistDto: CreateArtistDto) {
    const newArtist = new ArtistEntity();

    newArtist.id = uuidv4();
    newArtist.name = artistDto.name;
    newArtist.grammy = artistDto.grammy;

    await this.artists.save(newArtist);

    return newArtist;
  }

  async update(id: string, artistDto: UpdateArtistDto) {
    const artist = await this.artists.findOne({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    artist.grammy = artistDto.grammy ?? artist.grammy;
    artist.name = artistDto.name ?? artist.name;

    await this.artists.save(artist);

    return artist;
  }

  async delete(id: string) {
    const artist = await this.artists.findOne({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.artists.remove(artist);
  }
}
