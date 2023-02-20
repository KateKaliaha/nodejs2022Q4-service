import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from 'src/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracks: Repository<TrackEntity>,
  ) {}
  async getAll() {
    return await this.tracks.find();
  }

  async getById(id: string) {
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

    return track;
  }

  async create(trackDto: CreateTrackDto) {
    const track = new TrackEntity();

    track.id = uuidv4();
    track.name = trackDto.name;
    track.artistId = trackDto.artistId || null;
    track.albumId = trackDto.albumId || null;
    track.duration = trackDto.duration;

    await this.tracks.save(track);

    return track;
  }

  async update(id: string, trackDto: UpdateTrackDto) {
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

    track.name = trackDto.name ?? track.name;
    track.duration = trackDto.duration ?? track.duration;
    track.artistId = trackDto.artistId ?? track.artistId;
    track.albumId = trackDto.albumId ?? track.albumId;

    await this.tracks.save(track);

    return track;
  }

  async delete(id: string) {
    const track = await this.tracks.findOne({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new HttpException(
        'Artist with such ID is not existed',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.tracks.remove(track);
  }
}
