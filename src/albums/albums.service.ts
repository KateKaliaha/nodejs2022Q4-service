import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albums: Repository<AlbumEntity>,
  ) {}

  async getAll() {
    return await this.albums.find();
  }

  async getById(id: string) {
    const album = await this.albums.findOne({
      where: {
        id: id,
      },
    });

    if (!album) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async create(albumDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntity();

    newAlbum.id = uuidv4();
    newAlbum.name = albumDto.name;
    newAlbum.year = albumDto.year;
    newAlbum.artistId = albumDto.artistId || null;

    await this.albums.save(newAlbum);

    return newAlbum;
  }

  async update(id: string, artistDto: UpdateAlbumDto) {
    const album = await this.albums.findOne({
      where: {
        id: id,
      },
    });

    if (!album) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    album.name = artistDto.name ?? album.name;
    album.year = artistDto.year ?? album.year;
    album.artistId = artistDto.artistId ?? album.artistId;

    await this.albums.save(album);

    return album;
  }

  async delete(id: string) {
    const album = await this.albums.findOne({
      where: {
        id: id,
      },
    });

    if (!album) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.albums.remove(album);
  }
}
