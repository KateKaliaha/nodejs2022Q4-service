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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('content-type', 'application/json')
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Header('content-type', 'application/json')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('content-type', 'application/json')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.delete(id);
  }
}
