import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.delete(id);
  }
}
