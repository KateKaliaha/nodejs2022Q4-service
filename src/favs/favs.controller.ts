import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getAll() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtist(id);
  }
}
