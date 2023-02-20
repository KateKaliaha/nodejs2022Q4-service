import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';
import { ArtistEntity } from 'src/entities/artist.entity';
import { FavsEntity } from 'src/entities/favs.entity';
import { TrackEntity } from 'src/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsEntity)
    private readonly favs: Repository<FavsEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albums: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artists: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private readonly tracks: Repository<TrackEntity>,
  ) {}

  async getAll() {
    const [favorites] = await this.favs.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    if (!favorites) {
      await this.favs.save(new FavsEntity());
      return this.getAll();
    }

    return favorites;
  }

  async addArtist(id: string) {
    const artist = await this.artists.findOne({
      where: {
        id: id,
      },
    });

    if (!artist) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.getAll();
    fav.artists.push(artist);
    await this.favs.save(fav);
    return { message: 'Artist added to favorites' };
  }

  async deleteArtist(id: string) {
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

    const fav = await this.getAll();
    const index = fav.artists.findIndex((item) => item.id === id);

    if (index !== -1) {
      fav.artists.splice(index, 1);
    }

    await this.favs.save(fav);
  }

  async addAlbum(id: string) {
    const album = await this.albums.findOne({
      where: {
        id: id,
      },
    });

    if (!album) {
      throw new HttpException(
        'Album with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.getAll();
    fav.albums.push(album);
    await this.favs.save(fav);

    return { message: 'Album added to favorites' };
  }

  async deleteAlbum(id: string) {
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

    const fav = await this.getAll();
    const index = fav.albums.findIndex((item) => item.id === id);

    if (index !== -1) {
      fav.albums.splice(index, 1);
    }
    await this.favs.save(fav);
  }

  async addTrack(id: string) {
    const track = await this.tracks.findOne({
      where: {
        id: id,
      },
    });
    if (!track) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const fav = await this.getAll();
    fav.tracks.push(track);
    await this.favs.save(fav);
    return { message: 'Track added to favorites' };
  }

  async deleteTrack(id: string) {
    const track = await this.tracks.findOne({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new HttpException(
        'Track with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }
    const fav = await this.getAll();

    const index = fav.tracks.findIndex((item) => item.id === id);
    if (index !== -1) {
      fav.tracks.splice(index, 1);
    }

    await this.favs.save(fav);
  }
}
